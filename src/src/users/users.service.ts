import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Model} from 'mongoose';
import {User} from '../interfaces/user.interfaces';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

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
    const createdUser = new this.userModel(createUserDto);
    const user = await this.userModel.findOne({ email: createdUser.email });
    if (user) {
        return "User already exists";
    }
    else {
       this.access_token = jwt.sign({ user_email: createdUser.email }, 'secret', {
        expiresIn: '20m',
      });
      this.refresh_token = jwt.sign({ user_email: createdUser.email }, 'secret', {
        expiresIn: '120d',
      });
        await createdUser.save();
        return {
          message: 'you joined us successfully',
          name: createdUser.first_name + " " + createdUser.last_name,
          access_token: this.access_token,
          refresh_token: this.refresh_token,
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

  }
}
