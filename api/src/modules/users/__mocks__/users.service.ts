import { createUserStub } from '../tests/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([createUserStub(), createUserStub()]),
  findById: jest.fn().mockResolvedValue(createUserStub()),
  createUser: jest.fn().mockResolvedValue(createUserStub()),
  update: jest.fn().mockResolvedValue(createUserStub()),
  delete: jest.fn(),
});
