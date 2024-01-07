import { Socket } from 'socket.io-client';

import { MessageModel } from '@core/models';

export interface IMessageForm {
  message: string;
}

export interface WsJoinRoomDto {
  roomId: string;
  user: string;
}

export interface WsChatMessageDto {
  roomId: string;
  message: MessageModel;
}

interface ClientToServerEvents {
  chatMessage: (e: WsChatMessageDto) => void;
  joinRoom: (e: WsJoinRoomDto) => void;
}

interface ServerToClientEvents {
  chatMessage: (e: WsChatMessageDto) => void;
}

export type TSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
