import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsExceptionsFilter } from '@common/filters';
import { MessageModel } from '@domain/models';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { WsChatMessageDto, WsJoinRoomDto } from '@modules/rooms/dto/ws-messages.dto';
import { ClientToServerEvents, ServerToClientEvents } from '@modules/rooms/usecases';
import { IRoomsGatewayUsecases } from '@modules/rooms/usecases/rooms-gateway.usecases';

@UsePipes(new ValidationPipe())
@UseFilters(new WsExceptionsFilter())
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect, IRoomsGatewayUsecases {

  @WebSocketServer()
  private readonly server = new Server<ServerToClientEvents, ClientToServerEvents>();

  handleConnection(socket: Socket) {
    console.log(`socket ${socket.id} connected. Total connections: ${this.server.engine.clientsCount}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`socket ${socket.id} disconnected`);
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, message: { text, sentBy } }: WsChatMessageDto,
  ) {
    socket.join(roomId);
    const message = this.createMessage(text, sentBy);

    this.server.to(roomId).emit('chatMessage', {
      roomId,
      message,
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, user }: WsJoinRoomDto,
  ) {
    socket.join(roomId);

    const message = this.createMessage(`Hello ${user}! Welcome to ${roomId}`, user);

    this.server.to(roomId).emit('chatMessage', {
      roomId,
      message,
    });
  }

  private createMessage(text: string, user: string): MessageModel {
    const message = new MessageModel();
    message.text = text;
    message.timestamp = Date.now();
    message.sentBy = user;
    message.messageId = uuidv4();

    return message;
  }
}
