import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '@domain/models';
import { IUserRepository } from '@domain/repositories';
import { Model } from 'mongoose';

import { TUserDocument, User } from './entities';

@Injectable()
export class UsersRepository implements IUserRepository<TUserDocument> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const newUser = await this.userModel.create(user);

    return this.toUserModel(newUser);
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.userModel.find();

    return users.map(doc => this.toUserModel(doc));
  }

  async findById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id);

    return this.toUserModel(user);
  }

  async updateById(id: string, data: Partial<UserModel>): Promise<UserModel> {
    await this.userModel.findByIdAndUpdate(id, data);
    const updatedUser = await this.userModel.findById(id);

    return this.toUserModel(updatedUser);
  }

  toUserModel(doc: TUserDocument): UserModel {
    const user = new UserModel();
    user.userId = doc.userId;
    user.id = doc.id;
    user.username = doc.username;
    user.isActive = doc.isActive;

    return user;
  }
}
