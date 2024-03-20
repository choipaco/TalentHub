import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import UsersEntity from 'src/entities/auth.entity';
import SubscribeEntity from 'src/entities/subscribe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribeService {
    constructor(
        @InjectRepository(SubscribeEntity)
        private readonly subscribeRepository: Repository<SubscribeEntity>,
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService
      ){}

    async on(req: Request, res: Response) {
        const successLogin = req.headers.authorization;
        const {user_uuid} = req.body;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.userRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        const existUser =  await this.userRepository.findOne({
            where: {
                uuid: user_uuid
            }
        })

        try{
            if(!existUser){throw {status: 404, message: "없는 동영상입니다."}};
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        await this.subscribeRepository.insert({
            user,
            uploader:existUser
        })

        return res.status(200).json({
            success: true,
            message: '구독 완료'
        })

    }



    async off(req: Request, res: Response) {
        const successLogin = req.headers.authorization;
        const {uuid} = req.query;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.userRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });


        try{
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        await this.subscribeRepository.delete(String(uuid));

        return res.status(200).json({
            success: true,
            message: '구독 완료'
        })

    }


    async check(req: Request, res: Response) {
        const successLogin = req.headers.authorization;
        const {uuid} = req.query;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.userRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
            
            
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
        const s = await this.subscribeRepository.findOne({
            where:{
                user,
                uploader:{
                    uuid: String(uuid)
                }
            }
        });
            
        return res.status(200).json({
            success: true,
            message: '구독 완료',
            check: s
        })
    }

    async list(req: Request,res: Response){
        const successLogin = req.headers.authorization;

        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.userRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        const list = await this.subscribeRepository.find({
            where:{
                user
            },
            relations:{
                uploader:true
            }
        });

        

        return res.status(200).json({
            success: true,
            message: '구독 완료',
            list
        })
    }
}
