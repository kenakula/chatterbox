import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigsModule } from '@common/configs';
import { DatabaseModule } from '@common/database';
import { HashingService } from '@common/helpers';
import { UserModel } from '@domain/models';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { UsersModule } from '@modules/users';
import { TUserDocument, User, UserSchema } from '@modules/users/entities';
import { createUserStub, userStub } from '@modules/users/tests/user.stub';
import { UsersService } from '@modules/users/users.service';

import { AuthService } from '../auth.service';

jest.mock('@modules/users/users.service');

describe('AuthService', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let service: AuthService;
  let userService: UsersService;
  let hashingService: HashingService;

  afterEach(async () => {
    if (mongoConnection) {
      const collections = mongoConnection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }

      await mongoConnection.dropDatabase();
      await mongoConnection.close();
      await mongod.stop();
    }
  });

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, ConfigService, JwtService, HashingService,
      ],
      imports: [UsersModule, DatabaseModule, ConfigsModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    hashingService = module.get<HashingService>(HashingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate user', () => {
    let user: TUserDocument;

    beforeEach(async () => {
      const stub = userStub({ username: 'testAuthUser', password: '123123', passwordConfirm: '123123' });
      user = await userService.createUser(stub);
    });

    it('should validate user with correct credentials', async () => {
      const result = await service.validateUser(user.username, '123123');

      expect(result).toBeTruthy();
    });
  });
});
