import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  Param,
  UseGuards,
  Request,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { SigninDto } from './dto/user.dto';
import { UserProfile } from './interface';
import { AuthGuard } from '../middleware/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.userService.signup(createUserDto);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    try {
      const response = await this.userService.signin(signinDto);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  getUserProfile(@Request() request: any, @Res() res: Response) {
    try {
      console.log('what is this', request.user);
      const user: UserProfile = request.user;

      return res.status(200).json(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
