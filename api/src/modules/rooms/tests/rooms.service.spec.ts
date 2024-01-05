import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { MessageModel } from '@app/core/models';
import { Room, RoomSchema, TRoomDocument } from '@modules/rooms/entities';
import { createRoomStub, messageStub, roomStub, updateRoomStub } from '@modules/rooms/tests/room.stub';
import { User, UserSchema } from '@modules/users/entities';

import { RoomsService } from '../rooms.service';

describe('RoomsService', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let roomModel: Model<Room>;
  let userModel: Model<User>;
  let service: RoomsService;

  afterEach(async () => {
    if (mongoConnection) {
      const collections = mongoConnection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }

      await mongoConnection.dropDatabase();
      await mongoConnection.close();
      await mongod.stop();
    }
  });

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    roomModel = mongoConnection.model(Room.name, RoomSchema);
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService, {
          provide: getModelToken(Room.name),
          useValue: roomModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    jest.clearAllMocks();
  });

  const createRooms = async (count: number): Promise<void> => {
    for (let i = 0; i < count; i++) {
      const stub = roomStub({ name: `testRoom-${i}` });
      await roomModel.create(stub);
    }
  };

  const createMessages = (count: number): MessageModel[] => {
    const messages: MessageModel[] = [];

    for (let i = 0; i < count; i++) {
      messages.push(messageStub({ messageId: `testId-${i}` }));
    }

    return messages;
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create room', () => {
    let room: TRoomDocument;
    const newRoom = createRoomStub({ name: 'testRoom' });

    beforeEach(async () => {
      room = await service.createRoom(newRoom);
    });

    it('should create room', () => {
      expect(room).toBeDefined();
    });

    it('should create room with passed name', () => {
      expect(room.name).toBe(newRoom.name);
    });
  });

  describe('find all rooms', () => {
    let rooms: TRoomDocument[];

    beforeEach(async () => {
      await createRooms(21);
    });

    test('should find all rooms', async () => {
      rooms = await service.findAll({ name: undefined });

      expect(rooms).toHaveLength(21);
    });

    test('should find rooms filtered by name', async () => {
      rooms = await service.findAll({ name: '0' });

      expect(rooms).toHaveLength(3);
    });
  });

  describe('find room by id', () => {
    let room: TRoomDocument;

    beforeEach(async () => {
      await createRooms(10);

      const roomFound = await roomModel.findOne({ name: 'testRoom-1' });
      room = await service.findById(roomFound.id);
    });

    it('should find room by id', () => {
      expect(room).toBeTruthy();
      expect(room.name).toBe('testRoom-1');
    });

    it('should throw error if no room found', async () => {
      try {
        await roomModel.findByIdAndDelete(room.id);
        await service.findById(room.id);
        fail('test should fail');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update room', () => {
    const updateRoomData = updateRoomStub({ name: 'room-updated-name' });
    let updatedRoom: TRoomDocument;

    beforeEach(async () => {
      await createRooms(10);
      const roomFound = await roomModel.findOne({ name: 'testRoom-1' });
      updatedRoom = await service.update(roomFound.id, updateRoomData);
    });

    it('should return room object', () => {
      expect(updatedRoom).toBeTruthy();
    });

    it('room name should be updated', () => {
      expect(updatedRoom.name).toBe(updateRoomData.name);
    });

    it('should throw error if no user fount to update', async () => {
      try {
        await roomModel.findByIdAndDelete(updatedRoom.id);
        await service.update(updatedRoom.id, updateRoomData);
        fail('test should fail');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete room by id', () => {
    let roomFound: TRoomDocument;

    beforeEach(async () => {
      await createRooms(10);
      roomFound = await roomModel.findOne({ name: 'testRoom-5' });
      await service.delete(roomFound.id);
    });

    it('should delete room from db', async () => {
      const rooms = await roomModel.find();
      expect(rooms).toHaveLength(9);
    });

    it('should not find deleted room', async () => {
      roomFound = await roomModel.findById(roomFound.id);

      expect(roomFound).not.toBeTruthy();
    });

    it('should throw exception when no user found to delete', async () => {
      const room = await roomModel.findOneAndDelete({ name: 'testRoom-2' });

      try {
        await service.delete(room.id);
        fail('should fail');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('handle messages', () => {
    let room: TRoomDocument;
    const roomObj = createRoomStub();
    const messages = createMessages(5);

    const checkRoomMessages = async (count: number): Promise<void> => {
      const updatedRoom = await roomModel.findById(room.id);

      expect(updatedRoom.messages).toHaveLength(count);
    };

    beforeEach(async () => {
      room = await roomModel.create(roomObj);

      for (const message of messages) {
        await service.saveMessage(room.id, message);
      }
    });

    it('should save message to room', async () => {
      await checkRoomMessages(5);
    });

    it('should clear all messages', async () => {
      await service.clearMessages(room.id);

      await checkRoomMessages(0);
    });

    it('should delete message by id', async () => {
      const messageIdToDelete = messages[2].messageId;

      await service.deleteMessage(room.id, messageIdToDelete);

      await checkRoomMessages(4);
    });
  });
});
