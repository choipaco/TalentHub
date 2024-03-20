// email/email.controller.ts

import { Controller, Post, Res, BadRequestException,Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { Request,Response } from 'express';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendEmail')
  async sendVerificationCode(@Req() req:Request,@Res() res:Response) {
    const {email} = req.body;
    try{
        if(!email) throw({status:400,message:"이메일을 입력해주세요"});
        const verificationCode = await this.emailService.generateVerificationCode(email,req,res);
        const subject = '이메일 인증 코드가 도착했습니다!';
        const text = `인증 코드: ${verificationCode}`;
        await this.emailService.sendEmail(email, subject, text);
     
        return res.json({
            success: true,
            message: '이메일 인증 코드가 전송되었습니다.'
        });
    }catch(err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        });
    };
  };

  @Post('/checkEmail')
  async checkVerificationCode(@Req() req:Request,@Res() res:Response) {
    const {email,chk} = req.body;
    try{
        if(!email) throw({status:400,message:"이메일을 입력해주세요"});
        if(!chk) throw({status:400,message:"인증번호를 입력해주세요"});
        const isCodeValid = await this.emailService.checkVerificationCode(email, chk);

        if (isCodeValid) {
            return res.json({
                success: true,
                message: '인증 코드가 일치합니다.'
            });
        } else {
          throw new BadRequestException('인증 코드가 일치하지 않습니다.');
        }
    }catch(err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        });
    }
  }
}
