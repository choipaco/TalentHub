import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const s3 = new aws.S3();

    return {
      storage: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME, // 여기에 S3 버킷 이름을 입력하세요
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, `${uuidv4()}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // 이미지와 비디오 파일만 허용하도록 필터링합니다.
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
          cb(null, true);
        } else {
          cb(new Error('이미지나 동영상 파일만 허용됩니다'), false);
        }
      },
    };
  }
}
