import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, SigninDto } from './dto/user.dto';
import { UserRepo } from 'src/Repository/user.repository';
import { getPasswordHash, comparePassword, signToken } from '../utils/index';
import { SignupResponse } from './interface';
import { ResponseMessage, ErrorMessage } from '../utils/response';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async signup(createUserDto: CreateUserDto) {
    let user = await this.userRepo.getUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpException(
        ErrorMessage.USER_ALREADY_EXIST,
        HttpStatus.CONFLICT,
      );
    }
    const hash = await getPasswordHash(createUserDto.password);
    createUserDto.password = hash;
    user = await this.userRepo.createUser(createUserDto);
    user = user.toJSON();
    delete user.password;

    const response: SignupResponse = {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: ResponseMessage.USER_SIGNUP,
      user: {
        _id: user._id,
      },
    };
    return response;
  }

  async signin(signinDto: SigninDto) {
    let user = await this.userRepo.getUserByEmail(signinDto.email);
    if (!user) {
      throw new HttpException(
        ErrorMessage.INVALID_CREDENTIAL,
        HttpStatus.CONFLICT,
      );
    }
    const check = await comparePassword(signinDto.password, user.password);
    if (!check) {
      throw new HttpException(
        ErrorMessage.INVALID_CREDENTIAL,
        HttpStatus.CONFLICT,
      );
    }
    user = user.toJSON();
    delete user.password;

    const token = await signToken(user);

    console.log(token);

    const response = {
      success: true,
      statusCode: HttpStatus.ACCEPTED,
      message: 'User successfully login',
      user,
      token,
    };
    return response;
  }
}
