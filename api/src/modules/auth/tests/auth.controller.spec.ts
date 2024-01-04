import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@modules/auth/auth.service';

import { AuthController } from '../auth.controller';

jest.mock('../auth.service');

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
