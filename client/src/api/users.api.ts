import { AxiosInstance } from 'axios';

import { axiosInstance } from '@app/api/axios.api';
import { IApiResponse, IUser, IUserFilter } from '@shared/interfaces';

class UsersApi {
  private path = 'users';

  constructor(private readonly instance: AxiosInstance) {
  }

  public async getUsers(filter?: IUserFilter): Promise<IApiResponse<IUser[]>> {
    return this.instance.get(`${this.path}`, {
      params: {
        username: filter?.username,
      },
    });
  }
}

export const usersApi = new UsersApi(axiosInstance);
