import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HashingService } from '@common/helpers';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './dto';
import { TUserDocument, User } from './entities';
import { IUserUsecases } from './usecases';

@Injectable()
export class UsersService implements IUserUsecases<TUserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<TUserDocument> {
    const existingUser = await this.userModel.findOne({ username: userDto.username });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    if (userDto.password !== userDto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const newUser = await this.userModel.create(userDto);
    newUser.password = await this.hashingService.toHashed(userDto.password);
    await newUser.save();

    return newUser;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User with defined id not found');
    }

    return user;
  }

  async findByUsername(username: string): Promise<TUserDocument> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User with defined id not found');
    }

    return user;
  }

  async update(id: string, userDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, userDto);

    if (!user) {
      throw new NotFoundException('User with defined id not found');
    }

    return this.userModel.findById(id);
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('User with defined id not found');
    }
  }
}
