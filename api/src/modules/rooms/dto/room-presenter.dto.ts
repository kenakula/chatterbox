import { RoomModel, UserModel } from '@app/core/models';
import { TRoomDocument } from '@modules/rooms/entities';
import { User } from '@modules/users/entities';

export class RoomPresenterDto extends RoomModel {
  constructor(data: TRoomDocument) {
    super();

    this.id = data.id || data._id;
    this.name = data.name;
    this.description = data.description;
    this.isActive = data.isActive;
    this.messages = data.messages;
    this.creator = this.toUserDocument(data.creator);
    this.users = data.users?.map(user => this.toUserDocument(user)) ?? [];
  }

  private toUserDocument(entity: User): UserModel {
    const model = new UserModel();
    model.id = (entity as any)?._id;
    model.username = entity?.username;
    model.isActive = entity?.isActive;

    return model;
  }
}
