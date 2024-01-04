import { UserModel } from '@app/core/models';

export type TAuthedUser = Omit<UserModel, 'passwordConfirm' | 'password'>;
