import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/auth.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService
  ){}
async isEmaliExist(req: Request, res: Response) {
    const {id} = req.body;

    try{
        if(!id) throw ({status: 400, message:"이메일을 입력해주세요"});
        const isExist = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if(isExist){
            return res.json({
                success:false,
                message:"등록된 메일입니다."
            })
        }
        return res.json({
            success:true,
            message:"등록가능한 메일입니다."
        })


    }catch(err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        })  
    }
}

async login(req: Request, res: Response) {
    const {id, pw} = req.body;

    try{
        if (!id) throw ({ status: 400, message: '이메일을 입력해주세요' })
        if (!pw) throw ({ status: 400, message: '비밀번호를 입력해주세요' })

        const isExist = await this.userRepository.findOne({
            where: {id} //email만 비교하여 추출
        });
        
        if(!isExist){
            return res.json({
                success:false,
                message: '없는 아이디 입니다'
            })  
        }

        if(await bcrypt.compare(pw,isExist.pw)){ // hash 암호를 비교
            const token = await this.jwtService.sign(
                {
                  uuid: isExist.uuid
                },
                {
                  secret: process.env.SECRET_TOKEN,
                }
              );

              console.log(token);
              res.cookie('successLogin', token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 });

            return res.status(200).json({
                success: true,
                message: "로그인 완료",
                token
            })
        }
        return res.json({
            success:false,
            message: '비밀번호가 틀렸습니다'
        })  


    } catch (err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        })  
    }

}

async register(req: Request, res: Response) {
    const { id, pw,isEmailAuth,name,email } = req.body;
    let idExist;
    if(id){
        idExist = await this.userRepository.findOne({
            where:{
                id: String(id)
            }
        })
    }
    try {
        if (!id) throw ({ status: 400, message: '닉네임을 입력해주세요' })
        if(idExist) throw ({status: 401, message: "존재하는 아이디입니다"})
        if (!email) throw ({ status: 400, message: '이메일을 입력해주세요' })
        if (!pw) throw ({ status: 400, message: '비밀번호를 입력해주세요' })
        if (!name) throw ({ status: 400, message: '이름을 입력해주세요' })
        if(!isEmailAuth) throw({status: 400, message: '이메일 인증을 해주세요'})
    } catch (err) {
        return res.status(err.status).json({
            success:false,
            message: err.message
        });
    }
    const password = await bcrypt.hash(pw, 10)

    await this.userRepository.insert({
      id,
      pw:password,
      email,
      name
    })

    return res.status(201).json({
        success: true,
        message: '회원가입 완료'
    })
}

async logout(res:Response){
    res.clearCookie("successLogin")
    res.json({
        success:true,
        message:"로그아웃 완료"
    })
}

async inforMe(req: Request, res: Response) {
    const successLogin = req.headers.authorization;
    if(!successLogin) return res.status(400).json({
        success:false,
        message:'토큰이 없습니다'
    })
    const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
    const user = await this.userRepository.findOne({
        where: {
            uuid: verify.uuid
        },
        relations:{
            contents: true
        }
    });


    try{
        if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
    }catch(err){
        return res.status(err.status ?? 500).json({
            success: false,
            massage: err.message ?? 'Internal Error',
        });
    }

    return res.status(200).json({
        success: true,
        message: '댓글작성 완료',
        user
    })
}

async inforOther(req: Request,res: Response) {
    const {uuid} = req.params
    const user = await this.userRepository.findOne({
        where: {
            uuid: String(uuid)
        },
        relations:{
            contents: true
        }
    });

    try{
        if(!user){ throw {status: 400 , message: "없는 유저입니다"}};
    }catch(err){
        return res.status(err.status ?? 500).json({
            success: false,
            massage: err.message ?? 'Internal Error',
        });
    }

    return res.status(200).json({
        success: true,
        message: '댓글작성 완료',
        user
    })
}

async idExist(req: Request,res: Response){
    const {id} = req.query;

    const idExist = await this.userRepository.findOne({
        where:{
            id: String(id)
        }
    })
    console.log(idExist);
    try {
        if (idExist) throw ({ status: 400, message: '존재하는 아이디입니다' });
    } catch (err) {
        return res.status(err.status).json({
            success:false,
            message: err.message
        });
    }

    return true;
}


}




