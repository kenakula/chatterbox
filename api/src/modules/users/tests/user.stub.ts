import { UserModel } from '@app/core/models';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto';

interface IStubOptions {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  isActive?: boolean;
}

export const userStub = (options?: IStubOptions): UserModel => {
  const user = new UserModel();
  user.username = options?.username ?? 'testUserName';
  user.password = options?.password ?? '123123';
  user.passwordConfirm = options?.passwordConfirm ?? '123123';

  return user;
};

export const createUserStub = (options?: IStubOptions): CreateUserDto => ({
  username: options?.username ?? 'testUserName',
  password: options?.password ?? '123123',
  passwordConfirm: options?.passwordConfirm ?? '123123',
});

export const updateUserStub = (options?: IStubOptions): UpdateUserDto => ({
  username: options?.username ?? 'testUserName',
  isActive: !!options?.isActive,
});
