import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateRoomDto, DeleteMessageDto, RoomPresenterDto, SaveMessageDto, UpdateRoomDto } from './dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {
  }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const room = await this.roomsService.createRoom(createRoomDto);

    return new RoomPresenterDto(room);
  }

  @Get()
  async findAll() {
    const rooms = await this.roomsService.findAll();

    return rooms.map(room => new RoomPresenterDto(room));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const room = await this.roomsService.findById(id);

    return new RoomPresenterDto(room);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsService.update(id, updateRoomDto);

    return new RoomPresenterDto(room);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }

  @Post(':id')
  async saveMessage(@Param('id') id: string, @Body() message: SaveMessageDto) {
    return this.roomsService.saveMessage(id, message);
  }

  @Post('message/:id')
  async deleteMessage(@Param('id') id: string, @Body() message: DeleteMessageDto) {
    return this.roomsService.deleteMessage(id, message.id);
  }
}
