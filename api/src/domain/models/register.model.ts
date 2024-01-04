import { LoginModel } from '@domain/models/login.model';

export class RegisterModel extends LoginModel {
  passwordConfirm: string;
}
