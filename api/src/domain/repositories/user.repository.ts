import { UserModel } from '../models';

export interface IUserRepository<T> {
  findAll(): Promise<UserModel[]>;

  findById(id: string): Promise<UserModel>;

  updateById(id: string, data: Partial<UserModel>): Promise<UserModel>;

  deleteById(id: string): Promise<void>;

  createUser(user: UserModel): Promise<UserModel>;

  toUserModel(doc: T): UserModel;
}
