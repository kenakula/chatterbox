import { Injectable } from '@nestjs/common';
import { UserModel } from '@domain/models';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users-repository.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  create({ username, password, passwordConfirm }: CreateUserDto) {
    const user = new UserModel();
    user.userId = uuidv4();
    user.isActive = true;
    user.username = username;
    user.password = password;
    user.passwordConfirm = passwordConfirm;

    return this.usersRepository.createUser(user);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findById(id);
  }

  update(id: string, { username, isActive }: UpdateUserDto) {
    const user = new UserModel();
    user.username = username;
    user.isActive = isActive;

    return this.usersRepository.updateById(id, user);
  }

  remove(id: string) {
    return this.usersRepository.deleteById(id);
  }
}
