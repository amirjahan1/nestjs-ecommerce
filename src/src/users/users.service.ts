<<<<<<< HEAD
import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

import {Model} from 'mongoose';




import {User} from '../interfaces/user.interfaces';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
    ) {}

 async create(createUserDto: CreateUserDto): Promise<User | String > {
=======
import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';

import { User } from '../interfaces/user.interfaces';

@Injectable()
export class UsersService {
  private access_token: string;
  private refresh_token: string;
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<object | string> {
>>>>>>> 33a699a (finish refresh token)
    const createdUser = new this.userModel(createUserDto);

    // if user exists
    const user = await this.userModel.findOne({ email: createdUser.email });
    if (user) {
<<<<<<< HEAD
        return "User already exists";
    }
    else {
        return await createdUser.save();
    }
  }


 async findAll(): Promise<User[]> {
  return this.userModel.find().exec();
 }

  async findOne(id: number): Promise<User[]> {
   return this.userModel.find({id: id}).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id:number){
    return this.userModel.findByIdAndRemove(id);
=======
      return 'User already exists';
    } else {
      const payload = { email: createdUser.email };
      const access_token = jwt.sign(payload, 'secret', { expiresIn: '20m' });
      const refresh_token = jwt.sign(payload, 'secret', { expiresIn: '120d' });
      await createdUser.save();
      return {
        message: 'You joined us successfully',
        name: createdUser.first_name + ' ' + createdUser.last_name,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User[]> {
    return this.userModel.find({ email: email }).exec();
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ email: email }, updateUserDto, {
      new: true,
    });
  }

  async remove(email: string) {
    return this.userModel.findOneAndDelete({ email: email });
  }

  async refreshToken(email: string): Promise<object | string> {
    const user_info = this.findOne(email);
    if (user_info) {
      user_info.then((user) => {
        this.access_token = jwt.sign({ user_email: user[0].email }, 'secret', {
          expiresIn: '20m',
        });
        this.refresh_token = jwt.sign({ user_email: user[0].email }, 'secret', {
          expiresIn: '120d',
        });
      });
      return {
        access_token: this.access_token,
        refresh_token: this.refresh_token,
      };
    } else {
      return 'User does not exist';
    }
>>>>>>> 33a699a (finish refresh token)
  }
}
