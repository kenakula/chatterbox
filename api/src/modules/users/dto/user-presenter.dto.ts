import { UserModel } from '@app/core/models';
import { TUserDocument } from '@modules/users/entities';

export class UserPresenterDto extends UserModel {
  constructor(data: TUserDocument) {
    super();

    this.id = data.id || data._id;
    this.username = data.username;
    this.isActive = data.isActive;
  }
}
