import { AxiosInstance } from 'axios';

import { axiosInstance } from '@app/api/axios.api';
import { UserModel } from '@core/models';
import { IApiResponse } from '@shared/interfaces';

class UsersApi {
  private path = 'users';

  constructor(private readonly instance: AxiosInstance) {}

  public async getUsers(filter?: Pick<UserModel, 'username'>): Promise<IApiResponse<UserModel[]>> {
    return this.instance.get(this.path, {
      params: {
        username: filter?.username,
      },
    });
  }
}

export const usersApi = new UsersApi(axiosInstance);
