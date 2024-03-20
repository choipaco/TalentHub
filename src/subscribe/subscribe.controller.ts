import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { Request, Response } from 'express';

@Controller('subscribe')
export class SubscribeController {
    constructor(private readonly subscribeService: SubscribeService) {}

    @Post('/on')
    on(@Req() req:Request, @Res() res:Response) {
        return this.subscribeService.on(req, res);
    }

    @Delete('/off')
    off(@Req() req:Request, @Res() res:Response) {
        return this.subscribeService.off(req, res);
    }

    @Get('/check')
    check(@Req( )req:Request, @Res() res:Response){
        return this.subscribeService.check(req,res);
    }

    @Get('/list')
    list(@Req( )req:Request, @Res() res:Response){
        return this.subscribeService.list(req,res);
    }
}
