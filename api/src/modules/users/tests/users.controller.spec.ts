import { Test, TestingModule } from '@nestjs/testing';

import { UserPresenterDto } from '@modules/users/dto';

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
    let users: UserPresenterDto[];

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
    let user: UserPresenterDto;

    beforeEach(async () => {
      user = await controller.findOne('testId');
    });

    it('should call service method', () => {
      expect(service.findById).toHaveBeenCalledTimes(1);
    });

    it('should return user object', () => {
      expect(user).toBeDefined();
    });
  });

  describe('create user', () => {
    let user: UserPresenterDto;

    beforeEach(async () => {
      user = await controller.create(createUserStub());
    });

    it('should call service method', () => {
      expect(service.createUser).toHaveBeenCalledTimes(1);
    });

    it('should return user object', () => {
      expect(user).toBeDefined();
    });
  });

  describe('update user by id', () => {
    let user: UserPresenterDto;

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
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
