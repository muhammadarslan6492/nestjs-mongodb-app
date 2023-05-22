import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class UserRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      let user = new this.userModel({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
      });

      // save user
      user = await user.save();
      // return user
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
