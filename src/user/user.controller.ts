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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      console.log('this is create user dto', createUserDto);
      const user = await this.userService.signup(createUserDto);
      return res.status(HttpStatus.CREATED).send(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    try {
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
