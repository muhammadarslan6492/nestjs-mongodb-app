import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class UserRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, session: ClientSession) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user) {
        return user;
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
