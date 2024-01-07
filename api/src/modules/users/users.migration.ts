import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '@core/models';
import { Model } from 'mongoose';

import { User } from '@modules/users/entities';

@Injectable()
export class UsersMigration {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createAdminUser(): Promise<void> {
    const admin = await this.userModel.findOne({ username: 'admin' });

    if (admin) return;

    const adminUser = new UserModel();
    adminUser.username = 'admin';
    adminUser.isActive = true;
    adminUser.password = 'Aa123123';

    await this.userModel.create(adminUser);
  }
}
