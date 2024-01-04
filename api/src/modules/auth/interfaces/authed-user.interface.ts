import { UserModel } from '@domain/models';

export type TAuthedUser = Omit<UserModel, 'passwordConfirm' | 'password'>;
