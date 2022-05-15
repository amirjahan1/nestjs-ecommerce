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
    const createdUser = new this.userModel(createUserDto);

    // if user exists
    const user = await this.userModel.findOne({ email: createdUser.email });
    if (user) {
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
  }
}
