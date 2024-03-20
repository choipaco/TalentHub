import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as cacheManager from 'cache-manager';
import UsersEntity from 'src/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { Repository } from 'typeorm';
import {Request, Response} from 'express';
@Injectable()
export class EmailService {
  private transporter;
  private cache;

  constructor(
    @InjectRepository(UsersEntity)
    private readonly authRepository: Repository<UsersEntity>
  ) {
    
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    this.cache = cacheManager.caching({
      store: 'memory',
      ttl: 30,
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  }
  async generateVerificationCode(emails: string,req:Request,res:Response) {
    const {email} = req.body;

    const em = await this.authRepository.findOne({
      where: {
        email
      }
    })
    if(em){
      res.status(200).json({
        success: false,
        message: '이미 존제하는 이메일입니다'
      })
    }

    let rand = "";
    for(let i = 0; i < 6; ++i){
      const a = Math.floor(Math.random() * 10);
    
      rand += `${a}`;
    }; 
    const verificationCode = rand;
    await this.cache.set(emails, verificationCode, { ttl: 1000 * 60 * 5 });
    return verificationCode;
  }
  
  async checkVerificationCode(email: string, code: string): Promise<boolean> {
    const storedCode = await this.cache.get(email);
    if (storedCode && code === storedCode) {
      await this.cache.del(email);
      return true;
    }
    return false;
  }
}
