import { INestApplication } from '@nestjs/common/interfaces';
import { TestingModule } from '@nestjs/testing/testing-module';
import { createServer } from 'node:http';
import { Server, Socket as ServerSocket } from 'socket.io';
import { io as ioClient, Socket as ClientSocket } from 'socket.io-client';

export class SocketService {
  private _io: Server;

  private _app: INestApplication;

  constructor(private readonly testingModule: TestingModule) {
    this._app = this.testingModule.createNestApplication();
    const httpServer = createServer();
    this._io = new Server(httpServer);

    httpServer.listen(() => {
      this._clientSocket = ioClient('http://localhost:3001');
      this._io.on('connection', (socket) => {
        this._serverSocket = socket;
      });
    });
  }

  private _serverSocket: ServerSocket;

  get serverSocket(): ServerSocket {
    return this._serverSocket;
  }

  private _clientSocket: ClientSocket;

  get clientSocket(): ClientSocket {
    return this._clientSocket;
  }

  public async closeApp() {
    this._io.close();
    await this._app.close();
  }

  public async startApp() {
    await this._app.init();
  }
}
