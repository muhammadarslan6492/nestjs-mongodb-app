import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  Param,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('user')
export class UserController {
  constructor(
    @InjectConnection() private readonly mongooseConnection: Connection,
    private userService: UserService,
  ) {}
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const session = await this.mongooseConnection.startSession();
    await session.startTransaction();
    try {
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    const session = await this.mongooseConnection.startSession();
    await session.startTransaction();
    try {
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}
