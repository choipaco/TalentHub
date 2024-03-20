import { Controller, Get, Post, Body, Put, Param, Delete,Req,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/isEmaliExist')
  isEmaliExist(@Req() req:Request, @Res() res:Response) {
    return this.authService.isEmaliExist(req, res);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Post('/login')
  login(@Req() req:Request, @Res() res:Response) {
      return this.authService.login(req, res);
  }

  @Post('/register')
  register(@Req() req:Request, @Res() res:Response) {    
    return this.authService.register(req, res);
  }

  @Get('/exist')
  idExist(@Req() req:Request, @Res() res:Response){
    return this.authService.idExist(req,res);
  }
  
  @Get('/infor/me')
  inforMe(@Req() req:Request, @Res() res:Response){
    return this.authService.inforMe(req,res);
  }

  
  @Get('/infor/:uuid')
  inforOther(@Req() req:Request, @Res() res:Response){
    return this.authService.inforOther(req,res);
  }

}
