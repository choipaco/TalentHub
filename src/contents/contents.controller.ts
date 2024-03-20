import { Controller, Delete, Get, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { Request, Response } from 'express';

@Controller('contents')
export class ContentsController {
    constructor(private readonly contentsService: ContentsService) {}

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]))
    async uploadMedia(@UploadedFiles() files: { image?: Express.Multer.File[], video?: Express.Multer.File[] }, @Req() req:Request, @Res() res:Response ) {
        const { image, video } = files;
        const imageFile = image ? image[0] : null;
        const videoFile = video ? video[0] : null;
    return this.contentsService.create(
        videoFile,
        imageFile,
        req, 
        res
    )}   

    @Put('/update')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ]))
    async updateMedia(@UploadedFiles() files: { image?: Express.Multer.File[]}, @Req() req:Request, @Res() res:Response ) {
        const { image } = files;
        const imageFile = image ? image[0] : null;
    return this.contentsService.update(
        imageFile,
        req, 
        res
    )}  

    @Delete('/delete/:uuid')
    async delete(@Req() req:Request,@Res() res:Response){
        return this.contentsService.delete(req,res);
    }


    @Get('/search')
    async search(@Req() req:Request,@Res() res:Response){
        return this.contentsService.search(req,res);
    }

    @Get('/infor/:uuid')
    async infor(@Req() req:Request,@Res() res:Response){
        return this.contentsService.infor(req,res);
    }
}
