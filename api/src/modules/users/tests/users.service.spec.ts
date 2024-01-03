import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { User, UserSchema } from '../entities';
import { UsersService } from '../users.service';

import { userStub } from './user.stub';

describe('UsersRepository', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let service: UsersService;

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
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  const createUsers = async (count: number): Promise<void> => {
    for (let i = 0; i < count; i++) {
      const stub = userStub({ username: `testUser-${i}` });
      await userModel.create(stub);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('should create user', async () => {
      await service.createUser(userStub());

      const users = await userModel.find();
      expect(users).toHaveLength(1);
    });

    it('should create user with defined username', async () => {
      await service.createUser(userStub({ username: 'testUserName123' }));

      const user = await userModel.find({ username: 'testUserName123' });
      expect(user).toBeDefined();
    });

    it('should throw error when creating user with same username', async () => {
      const stub = userStub({ username: 'testUserName' });
      await userModel.create(stub);

      try {
        await service.createUser(stub);
        fail('test should fail');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
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
      await service.delete(userToDelete._id.toString());

      const usersNew = await userModel.find();
      expect(usersNew).toHaveLength(9);

      const deletedUser = await userModel.findById(userToDelete.id);
      expect(deletedUser).not.toBeTruthy();
    });

    it('should throw not found error with invalid id', async () => {
      const userToDelete = await userModel.findOne({ username: 'testUser-1' });
      await service.delete(userToDelete._id.toString());

      try {
        await service.delete(userToDelete._id.toString());
        fail('Test should throw error');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('find all users', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should get all users', async () => {
      const users = await service.findAll();

      expect(users).toHaveLength(10);
    });
  });

  describe('find user by id', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should find user by id', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await service.findById(user._id.toString());

      expect(result).toBeTruthy();
    });

    it('should find user by id with defined username', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await service.findById(user._id.toString());

      expect(result.username).toBe('testUser-0');
    });

    it('should throw error when did not find user', async () => {
      const user = await userModel.findOneAndDelete({ username: 'testUser-0' });

      try {
        await service.findById(user.id);
        fail('test should throw error');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update user', () => {
    beforeEach(async () => {
      await createUsers(10);
    });

    it('should return updated user', async () => {
      const user = await userModel.findOne({ username: 'testUser-0' });
      const result = await service.update(user._id.toString(), { username: 'updatedUserName' });

      expect(result).toBeTruthy();
      expect(result.username).toBe('updatedUserName');
    });

    it('should throw error when did not find user', async () => {
      const user = await userModel.findOneAndDelete({ username: 'testUser-0' });

      try {
        await service.update(user.id, { username: 'updatedUserName' });
        fail('test should fail');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
