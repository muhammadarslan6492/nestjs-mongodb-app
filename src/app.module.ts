import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}