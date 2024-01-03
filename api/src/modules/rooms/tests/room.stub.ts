import { MessageModel, RoomModel } from '@domain/models';

import { CreateRoomDto, UpdateRoomDto } from '@modules/rooms/dto';

interface IStubOptions {
  id?: string;
  name?: string;
  description?: string;
  creator?: string;
  users?: string[];
}

export const roomStub = (options?: IStubOptions): RoomModel => {
  const model = new RoomModel();
  model.id = options?.id ?? 'testId';
  model.name = options?.name ?? 'testRoomName';
  model.description = options?.description ?? 'testRoomDescription';

  return model;
};

export const createRoomStub = (options?: IStubOptions): CreateRoomDto => ({
  name: options?.name ?? 'testRoomName',
  description: options?.description ?? 'testRoomDescription',
  creator: options?.creator,
});

export const updateRoomStub = (option?: IStubOptions): UpdateRoomDto => ({
  name: option?.name ?? 'testRoomName-updated',
  description: option?.name ?? 'testRoomDescription-updated',
  users: option?.users ?? [],
});

interface IMessageStubOptions {
  messageId?: string;
  text?: string;
}

export const messageStub = (options?: IMessageStubOptions): MessageModel => ({
  messageId: options?.messageId ?? 'testMessageId',
  text: options?.text ?? 'testMessageText',
  timestamp: Date.now(),
  sentBy: 'testSentById',
});
