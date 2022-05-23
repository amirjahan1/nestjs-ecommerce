<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

>>>>>>> 33a699a (finish refresh token)
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
<<<<<<< HEAD
=======
import { UserGuard } from './user.guard';
>>>>>>> 33a699a (finish refresh token)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return this.usersService.create(createUserDto);
  }
<<<<<<< HEAD

=======
  // refresh token find user by email
  @Post('refresh-token')
  async refreshToken(@Req() req) {
    const email = req.body.email;
    return this.usersService.refreshToken(email);
  }

  @UseGuards(UserGuard)
>>>>>>> 33a699a (finish refresh token)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

<<<<<<< HEAD
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
=======
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
>>>>>>> 33a699a (finish refresh token)
  }
}
