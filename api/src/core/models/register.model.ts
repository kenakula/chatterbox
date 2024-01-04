import { LoginModel } from '@app/core/models/login.model';

export class RegisterModel extends LoginModel {
  passwordConfirm: string;
}
