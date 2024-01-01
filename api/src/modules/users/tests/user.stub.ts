import { UserModel } from '@domain/models';

import { CreateUserDto, UpdateUserDto } from '@modules/users/dto';

interface TStubOptions {
  id?: string;
  userId?: string;
  username?: string;
  isActive?: boolean;
}

export const userStub = (options?: TStubOptions): UserModel => {
  const user = new UserModel();
  user.username = options?.username ?? 'testUserName';
  user.id = options?.id ?? 'testId';
  user.userId = options?.userId ?? 'userId';

  return user;
};

export const createUserStub = (options?: TStubOptions): CreateUserDto => ({
  username: options?.username ?? 'testUserName',
  password: '123123',
  passwordConfirm: '123123',
});

export const updateUserStub = (options?: TStubOptions): UpdateUserDto => ({
  username: options?.username ?? 'testUserName',
  isActive: !!options?.isActive,
});
