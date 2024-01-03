import { Test, TestingModule } from '@nestjs/testing';

import { RoomPresenterDto } from '@modules/rooms/dto';
import { createRoomStub, updateRoomStub } from '@modules/rooms/tests/room.stub';

import { RoomsController } from '../rooms.controller';
import { RoomsService } from '../rooms.service';

jest.mock('../rooms.service.ts');

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all rooms', () => {
    let rooms: RoomPresenterDto[];

    beforeEach(async () => {
      rooms = await controller.findAll();
    });

    it('should call service method', () => {
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return array of objects', () => {
      expect(rooms).toHaveLength(3);
    });
  });

  describe('create room', () => {
    const roomStub = createRoomStub({ name: 'testRoom' });

    beforeEach(async () => {
      await controller.create(roomStub);
    });

    it('should call service method', () => {
      expect(service.createRoom).toHaveBeenCalledTimes(1);
    });

    it('should call service method with defined dto', () => {
      expect(service.createRoom).toHaveBeenCalledWith(roomStub);
    });
  });

  describe('find one room by id', () => {
    beforeEach(async () => {
      await controller.findOne('testId');
    });

    it('should call service method', () => {
      expect(service.findById).toHaveBeenCalledTimes(1);
    });

    it('should call service method with defined id', () => {
      expect(service.findById).toHaveBeenCalledWith('testId');
    });
  });

  describe('update room by id', () => {
    const userStub = updateRoomStub();

    beforeEach(async () => {
      await controller.update('testId', userStub);
    });

    it('should call service method', () => {
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should call service method with defined id', () => {
      expect(service.update).toHaveBeenCalledWith('testId', userStub);
    });
  });

  describe('delete room by id', () => {
    beforeEach(async () => {
      await controller.delete('testId');
    });

    it('should call service method', () => {
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    it('should call service method with defined id', () => {
      expect(service.delete).toHaveBeenCalledWith('testId');
    });
  });
});
