import { Document } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from '../dto';

export interface IUserUsecases<T extends Document> {
  createUser(data: CreateUserDto): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: string): Promise<T>;

  findByUsername(username: string): Promise<T>;

  update(id: string, data: UpdateUserDto): Promise<T>;

  delete(id: string): Promise<void>;
}
