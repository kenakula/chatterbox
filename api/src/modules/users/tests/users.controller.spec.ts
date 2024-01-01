import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '@domain/models';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

import { createUserStub, updateUserStub } from './user.stub';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all users', () => {
    let users: UserModel[];

    beforeEach(async () => {
      users = await controller.findAll();
    });

    it('should call service method', () => {
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return users array', () => {
      expect(users).toHaveLength(2);
    });
  });

  describe('get user by id', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await controller.findOne('testId');
    });

    it('should call service method', () => {
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return user object', () => {
      expect(user).toBeDefined();
    });
  });

  describe('create user', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await controller.create(createUserStub());
    });

    it('should call service method', () => {
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should return user object', () => {
      expect(user).toBeDefined();
    });
  });

  describe('update user by id', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await controller.update('testId', updateUserStub());
    });

    it('should call service method', () => {
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return user object', () => {
      expect(user).toBeDefined();
    });
  });

  describe('delete user by id', () => {
    beforeEach(async () => {
      await controller.remove('testId');
    });

    it('should call service method', () => {
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
