import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsException,
} from '@nestjs/websockets';
import { WsExceptionsFilter } from '@common/filters';
import { LoggerService } from '@common/logger';
import { MessageModel } from '@domain/models';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { SaveMessageDto } from '@modules/rooms/dto';
import { WsChatMessageDto, WsJoinRoomDto } from '@modules/rooms/dto/ws-messages.dto';
import { RoomsService } from '@modules/rooms/rooms.service';
import { ClientToServerEvents, ServerToClientEvents } from '@modules/rooms/usecases';
import { IRoomsGatewayUsecases } from '@modules/rooms/usecases/rooms-gateway.usecases';

@UsePipes(new ValidationPipe())
@UseFilters(new WsExceptionsFilter())
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect, IRoomsGatewayUsecases {
  private readonly logger = new LoggerService(RoomsGateway.name);

  @WebSocketServer()
  private readonly server = new Server<ServerToClientEvents, ClientToServerEvents>();

  constructor(
    private readonly roomsService: RoomsService,
  ) {}

  handleConnection(socket: Socket) {
    this.logger.log(`socket ${socket.id} connected. Total connections: ${this.server.engine.clientsCount}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`socket ${socket.id} disconnected`);
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, message: { text, sentBy } }: WsChatMessageDto,
  ) {
    socket.join(roomId);
    const message = this.createMessage(text, sentBy);

    try {
      await this.roomsService.saveMessage(roomId, message);
      this.server.to(roomId).emit('chatMessage', {
        roomId,
        message,
      });
    } catch (err) {
      throw new WsException('Message was not sent');
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, user }: WsJoinRoomDto,
  ) {
    socket.join(roomId);

    this.logger.log(`user ${user} joined the room`);
    const message = this.createMessage(`Hello ${user}! Welcome to ${roomId}`, 'system');

    this.server.to(roomId).emit('chatMessage', {
      roomId,
      message,
    });
  }

  private createMessage(text: string, user: string): MessageModel {
    const message = new SaveMessageDto();
    message.text = text;
    message.timestamp = Date.now();
    message.sentBy = user;
    message.messageId = uuidv4();

    return message;
  }
}
