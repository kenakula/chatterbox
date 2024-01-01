import { createUserStub } from '../tests/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([createUserStub(), createUserStub()]),
  findOne: jest.fn().mockResolvedValue(createUserStub()),
  create: jest.fn().mockResolvedValue(createUserStub()),
  update: jest.fn().mockResolvedValue(createUserStub()),
  remove: jest.fn(),
});
