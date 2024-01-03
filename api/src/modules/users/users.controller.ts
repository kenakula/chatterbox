import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, UserPresenterDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return new UserPresenterDto(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map(user => new UserPresenterDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    return new UserPresenterDto(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    return new UserPresenterDto(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
