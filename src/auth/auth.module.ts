import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 추가
import UsersEntity from 'src/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),
  JwtModule.register({
    secret: process.env.SECRET_TOKEN,
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
