import { AxiosInstance } from 'axios';

import { LoginDto, SignInDto } from '@shared/dtos';
import { IApiResponse, ILoginResponse, ILogoutResponse, ISignInResponse, IUser } from '@shared/interfaces';

import { axiosInstance } from './axios.api';

class AuthApi {
  private path = 'auth';

  constructor(private readonly instance: AxiosInstance) {
  }

  public async login(data: LoginDto): Promise<IApiResponse<ILoginResponse>> {
    return this.instance.post<string, IApiResponse<ILoginResponse>, LoginDto>(`${this.path}/login`, data);
  }

  public async signin(data: SignInDto): Promise<IApiResponse<ISignInResponse>> {
    return this.instance.post<string, IApiResponse<ISignInResponse>, SignInDto>(`${this.path}/signup`, data);
  }

  public async logout(): Promise<ILogoutResponse> {
    return this.instance.post<string, ILogoutResponse, void>(`${this.path}/logout`);
  }

  public async getMe(): Promise<IApiResponse<IUser>> {
    return this.instance.get<void, IApiResponse<IUser>>(`${this.path}/me`);
  }
}

export const authApi = new AuthApi(axiosInstance);
