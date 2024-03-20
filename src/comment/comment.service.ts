import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request,Response } from 'express';
import CommentEntity from 'src/entities/comments.entity';
import AuthEntity from 'src/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import UsersEntity from 'src/entities/auth.entity';
import ContentEntity from 'src/entities/contents.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(UsersEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(ContentEntity)
        private readonly contentsRepository: Repository<ContentEntity>,
        private readonly jwtService: JwtService
    ){}
    async create(req: Request,res: Response) {
        const successLogin = req.headers.authorization;
        const {comment,content_uuid} = req.body;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        const existContent =  await this.contentsRepository.findOne({
            where: {
                uuid: content_uuid
            }
        })

        try{
            if(!comment){ throw {status: 400, message: '내용을 입력해주세요'} };
            if(!existContent){throw {status: 404, message: "없는 동영상입니다."}};
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        await this.commentRepository.insert({
            comment,
            user,
            contents: existContent
        })

        return res.status(200).json({
            success: true,
            message: '댓글작성 완료'
        })

    }

    async modify(req: Request,res: Response) {
        const successLogin = req.headers.authorization;
        const {contents_uuid, uuid, comment} = req.body;

        const findComment = await this.commentRepository.findOne({
            where:{
                uuid: uuid
            }
        })

        try{ 
            const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
            const user = await this.authRepository.findOne({
                where: {
                    uuid: verify.uuid
                },
            });

            const contents = await this.contentsRepository.findOne({
                where:{
                    uuid: contents_uuid
                }
            })

            if(!findComment){ throw {status: 400, message: "없는 댓글 입니다"}};
            if(!contents) throw {status: 404, message: "없는 동영상 입니다."}
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
        findComment.comment = comment
        await this.commentRepository.save(
            findComment
        )
        

        return res.status(200).json({
            success: true,
            message: "댓글이 수정됐습니다."
        })

    }

    async delete(req: Request, res: Response){
        const successLogin = req.headers.authorization;
        const {uuid} = req.query;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!uuid){ throw{status: 400, message: '다시 선택해주세요'}};
            if(!user){ throw{status: 400, message: '잘못된 토큰입니다'}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

            await this.commentRepository.delete(String(uuid))

            return res.status(200).json({
                success: true,
                message: '댓글이 삭제되었습니다.'
            })
    }

    async getList(req: Request,res: Response) {
        const {uuid} = req.params;

        try{
            if(!uuid){ throw {status: 400, message: "콘텐츠 uuid를 써주세요"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        let comments:any = await this.commentRepository.find({
            where:{
                contents:{
                    uuid: uuid
                }
            },
            order:{
                createdAt:'DESC'
            },
            relations: ['user']
        })

        comments = comments.map(content => ({
            ...content,
            user: {
                uuid: content.user.uuid,
                id: content.user.id
            }
        }));
        
        return res.status(200).json({
            success: true,
            comments
        })

    }


    


}
