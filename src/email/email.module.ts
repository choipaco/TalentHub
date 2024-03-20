import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
