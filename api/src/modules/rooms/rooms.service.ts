import { Injectable } from '@nestjs/common';

import { RoomsRepository } from '@modules/rooms/rooms-repository.service';

import { CreateRoomDto, UpdateRoomDto } from './dto';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {
  }

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll() {
    return 'This action returns all rooms';
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
