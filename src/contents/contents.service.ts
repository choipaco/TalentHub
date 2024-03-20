import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from "aws-sdk";
import { Request, Response } from 'express';
import ContentEntity from 'src/entities/contents.entity';
import { Like, Repository } from 'typeorm';
import UsersEntity from 'src/entities/auth.entity';
import { S3QbjectDelete } from 'src/utils/s3QbjectDelete';
import CommentEntity from 'src/entities/comments.entity';

@Injectable()
export class ContentsService {
    private s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    constructor(
        @InjectRepository(ContentEntity)
        private readonly contentRepository: Repository<ContentEntity>,
        @InjectRepository(UsersEntity)
        private readonly authRepository: Repository<UsersEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        private readonly jwtService: JwtService
    ){}
    

    async create(
        videoFile: Express.Multer.File, 
        imageFile: Express.Multer.File,
        req: Request, 
        res: Response
        ){
        const successLogin = req.headers.authorization;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });
        const {title, explanation} = req.body;
        const videoUrl:any = videoFile;
        const imageUrl:any = imageFile;
        
        try{
            if(!title){ throw {status: 400, message: ',제목을 입력해주세요'} };
            if(!explanation){throw {status: 404, message: "상세설명을 입력해주세요"}};
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
        

        await this.contentRepository.insert({
            title,
            explanation,
            thumbnail: imageUrl.location,
            video: videoUrl.location,
            user
        });

        return res.status(201).json({
            success: true,
            message: "콘텐츠가 성공적으로 생성되었습니다"
        })
    }

    async update(
        imageFile: Express.Multer.File,
        req: Request,
        res: Response
    ) {
        const successLogin = req.headers.authorization;
        const verify = this.jwtService.verify(successLogin, { secret: process.env.SECRET_TOKEN });
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });
        const { title, explanation, uuid } = req.body;
        const imageUrl: any = imageFile;
        const updateData = await this.contentRepository.findOne({
            where: {
                uuid: uuid
            }
        });
    
        try {
            if (!updateData) {
                throw { status: 404, message: "없는 콘텐츠 입니다." };
            }
            if (!user) {
                throw { status: 400, message: "잘못된 토큰입니다" };
            }
        } catch (err) {
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
    
        updateData.title = title ? title : updateData.title;
        updateData.explanation = explanation ? explanation : updateData.explanation;
    
        if (imageFile) {
            const deleteParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: S3QbjectDelete(updateData.thumbnail),
            };
            await this.s3.deleteObject(deleteParams).promise();
    
            if (imageUrl) {
                updateData.thumbnail = imageUrl.location;
            }
        }
    
        updateData.views -= 1;
        await this.contentRepository.save(updateData);
    
        return res.status(200).json({
            success: true,
            message: "콘텐츠가 성공적으로 수정되었습니다"
        });
    }
    
    

    async delete(
        req: Request, 
        res: Response
        ){
        const successLogin = req.headers.authorization;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });
        const {uuid} = req.params;
        const updateData = await this.contentRepository.findOne({
            where:{
                uuid: uuid
            }
        })
        try{
            if(!updateData){ throw {status: 404, message: "없는 콘텐츠 입니다"}}
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        const deleteImg = {
            Bucket: process.env.BUCKET_NAME,
            Key: S3QbjectDelete(updateData.thumbnail),
        };

        const deleteVideo = {
            Bucket: process.env.BUCKET_NAME,
            Key: S3QbjectDelete(updateData.video),
        };

        await this.s3.deleteObject(deleteImg).promise();
        await this.s3.deleteObject(deleteVideo).promise();
        
        await this.contentRepository.delete(uuid);

        return res.status(200).json({
            success: true,
            message: "콘텐츠가 성공적으로 삭제되었습니다"
        })
    }

    async infor(req:Request, res:Response){
        const {uuid} = req.params;
        let search;

        search = await this.contentRepository.findOne({
            where:{
                uuid: uuid
            },
            relations: ['user']
        });
       

        if (search && search.user) {
            search.user = {
                uuid: search.user.uuid,
                id: search.user.id
            };
        }

        try{
            if(!uuid){ throw {status: 400, message: "값을 입력해주세요"}}
            if(!search){ throw {status: 404 , message: "없는 콘텐츠 입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
        search.views += 1;
        await this.contentRepository.save(search);
        return res.status(200).json({
            success: true,
            message: "콘텐츠 전송완료",
            search
        })
    }


    async search(req:Request, res:Response){
        const {s} = req.query;
        let search;
        if(!s){
            search = await this.contentRepository.find({
                select:['uuid','title','thumbnail','views','createdAt','user'],
                order:{
                    views: 'DESC'
                },
                relations: ['user']
            });
        }else{
            search = await this.contentRepository.find({
                select:['uuid','title','thumbnail','views','createdAt','user'],
                where:{
                    title: Like(`%${s}%`)
                },
                order:{
                    views: 'DESC'
                },
                relations: ['user']
            });
        }

        search = search.map(content => ({
            ...content,
            user: {
                uuid: content.user.uuid,
                id: content.user.id
            }
        }));
        

        return res.status(200).json({
            success: true,
            message: "리스트가 정상적으로 출력됐습니다",
            search
        })
    }

}
