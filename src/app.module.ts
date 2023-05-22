import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './config/database.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    // Mongodb connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
