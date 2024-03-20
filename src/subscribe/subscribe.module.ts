import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import UsersEntity from 'src/entities/auth.entity';
import SubscribeEntity from 'src/entities/subscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity,UsersEntity]),
  JwtModule.register({
    secret: process.env.SECRET_TOKEN,
  }),],
  providers: [SubscribeService],
  controllers: [SubscribeController]
})
export class SubscribeModule {}
