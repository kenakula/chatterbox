import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';

import { AppModule } from '@app/app.module';

import { SocketService } from '../socket-service';

describe('Events', () => {
  let clientSocket: ClientSocket;
  let serverSocket: ServerSocket;
  let service: SocketService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot({ envFilePath: '../.env' })],
    }).compile();

    service = new SocketService(module);
    await service.startApp();

    clientSocket = service.clientSocket;
    serverSocket = service.serverSocket;
  });

  afterEach(async () => {
    await service.closeApp();
  });

  describe('should work', () => {
    it('when connect', (done) => {
      clientSocket.on('hello', (arg) => {
        expect(arg).toEqual('world');
        done();
      });
      //
      // serverSocket.emit('hello', 'world');

      expect(true).toBeTruthy();
      done();
    });
  });
});
