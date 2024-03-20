import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContentEntity from 'src/entities/contents.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/configuration/multerConfig';
import UsersEntity from 'src/entities/auth.entity';
import CommentEntity from 'src/entities/comments.entity';
import SubscribeEntity from 'src/entities/subscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity,UsersEntity,CommentEntity,SubscribeEntity]),
  JwtModule.register({
    secret: process.env.SECRET_TOKEN,
  }),
  MulterModule.registerAsync({
    useClass : MulterConfig
}),
],
  
  controllers: [ContentsController],
  providers: [ContentsService]
})
export class ContentsModule {}
