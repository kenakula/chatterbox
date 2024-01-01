import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '@domain/models';

import { UsersService } from '../users.service';
import { UsersRepository } from '../users-repository.service';

import { createUserStub, updateUserStub } from './user.stub';

jest.mock('../users-repository.service.ts');

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await service.create(createUserStub());
    });

    it('should call repository method', () => {
      expect(repository.createUser).toHaveBeenCalledTimes(1);
    });

    it('should return created user', () => {
      expect(user).toBeDefined();
    });
  });

  describe('find all users', () => {
    let users: UserModel[];

    beforeEach(async () => {
      users = await service.findAll();
    });

    it('should call repository method', () => {
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return created user', () => {
      expect(users).toHaveLength(2);
    });
  });

  describe('find user by id', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await service.findOne('testId');
    });

    it('should call repository method', () => {
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return created user', () => {
      expect(user).toBeDefined();
    });
  });

  describe('update user by id', () => {
    let user: UserModel;

    beforeEach(async () => {
      user = await service.update('testId', updateUserStub());
    });

    it('should call repository method', () => {
      expect(repository.updateById).toHaveBeenCalledTimes(1);
    });

    it('should return created user', () => {
      expect(user).toBeDefined();
    });
  });

  describe('remove user by id', () => {
    beforeEach(async () => {
      await service.remove('testId');
    });

    it('should call repository method', () => {
      expect(repository.deleteById).toHaveBeenCalledTimes(1);
    });
  });
});
