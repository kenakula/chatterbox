import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { User, UserSchema } from '../entities';
import { UsersRepository } from '../users-repository.service';

import { userStub } from './user.stub';

describe('UsersRepository', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let repository: UsersRepository;

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

    const module = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    jest.clearAllMocks();
  });

  const createUsers = async (count: number): Promise<void> => {
    for (let i = 0; i < count; i++) {
      const stub = userStub({ userId: i.toString(), username: `testUser-${i}` });
      await userModel.create(stub);
    }
  };

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create user', () => {
    it('should create user', async () => {
      await repository.createUser(userStub());

      const users = await userModel.find();
      expect(users).toHaveLength(1);
    });

    it('should create user with defined username', async () => {
      await repository.createUser(userStub({ username: 'testUserName123' }));

      const user = await userModel.find({ username: 'testUserName123' });
      expect(user).toBeDefined();
    });
  });

  describe('delete user by id', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should delete user', async () => {
      const users = await userModel.find();
      expect(users).toHaveLength(10);
      const userToDelete = await userModel.findOne({ username: 'testUser-5' });
      await repository.deleteById(userToDelete.id);

      const usersNew = await userModel.find();
      expect(usersNew).toHaveLength(9);

      const deletedUser = await userModel.findById(userToDelete.id);
      expect(deletedUser).not.toBeTruthy();
    });
  });

  describe('find all users', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should get all users', async () => {
      const users = await repository.findAll();

      expect(users).toHaveLength(10);
    });
  });

  describe('find user by id', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should find user by id', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await repository.findById(user.id);

      expect(result).toBeTruthy();
    });

    it('should find user by id with defined username', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await repository.findById(user.id);

      expect(result.username).toBe('testUser-0');
    });
  });

  describe('update user', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should return updated user', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await repository.updateById(user.id, { username: 'updatedUserName' });

      expect(result).toBeTruthy();
      expect(result.username).toBe('updatedUserName');
    });
  });
});
