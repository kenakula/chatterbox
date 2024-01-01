import { UserModel } from '@domain/models';

import { updateUserStub, userStub } from '../tests/user.stub';

export const UsersRepository = jest.fn().mockReturnValue({
  createUser: jest.fn().mockReturnValue(userStub()),
  deleteById: jest.fn((id: string) => id),
  findAll: jest.fn().mockReturnValue([userStub(), userStub()]),
  findById: jest.fn((id: string) => userStub({ id })),
  updateById: jest.fn((id: string, data: Partial<UserModel>) => updateUserStub({
    id,
    isActive: data.isActive,
    username: data.username,
  })),
});
