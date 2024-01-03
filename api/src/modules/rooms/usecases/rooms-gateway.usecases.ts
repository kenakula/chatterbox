import { Socket } from 'socket.io';

import { WsChatMessageDto, WsJoinRoomDto } from '@modules/rooms/dto/ws-messages.dto';

export interface IRoomsGatewayUsecases {
  handleMessage(socket: Socket, data: WsChatMessageDto): Promise<void>;

  handleJoinRoom(socket: Socket, user: WsJoinRoomDto): Promise<void>;
}

export interface ClientToServerEvents {
  chatMessage: (e: WsChatMessageDto) => void;
  joinRoom: (e: WsJoinRoomDto) => void;
}

export interface ServerToClientEvents {
  chatMessage: (e: WsChatMessageDto) => void;
}

