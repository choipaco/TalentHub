import { Controller, Get, Post, Body, Patch, Param, Delete,Req,Res, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import {Request,Response} from 'express';
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('/create')
    Create(@Req() req:Request,@Res() res:Response){
        return this.commentService.create(req,res);
    }

    @Delete('/delete')
    Delete(@Req() req:Request,@Res() res:Response){
        return this.commentService.delete(req,res);
    }

    @Put('/modify')
    Modify(@Req() req:Request,@Res() res:Response){
        return this.commentService.modify(req,res);
    }

    @Get('/get/list/:uuid')
    GetList(@Req() req:Request,@Res() res:Response){
        return this.commentService.getList(req,res);
    }

}