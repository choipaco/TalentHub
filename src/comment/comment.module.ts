import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from 'src/entities/comments.entity';
import { JwtModule } from '@nestjs/jwt';
import UsersEntity from 'src/entities/auth.entity';
import ContentEntity from 'src/entities/contents.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([CommentEntity,UsersEntity,ContentEntity]),
  JwtModule.register({
    secret: process.env.SECRET_TOKEN,
}),],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}