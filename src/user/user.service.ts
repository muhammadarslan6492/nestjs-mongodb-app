import {
  Injectable,
  HttpException,
  NotAcceptableException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepo } from 'src/Repository/user.repository';
import { getPasswordHash } from '../utils/index';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async signup(createUserDto: CreateUserDto) {
    console.log('this is services', createUserDto);
    let user = await this.userRepo.getUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('User aleady in the system', 400);
    }
    const hash = await getPasswordHash(createUserDto.password);
    createUserDto.password = hash;
    user = await this.userRepo.createUser(createUserDto);
    return user;
  }
}
