import {
  Get,
  Render,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BaseController } from './base.controller';

import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import * as multer from 'multer';

@Controller('death-certificate')
export class DeathCertificateController extends BaseController {
  @Get()
  @Render('death-certificate/index')
  index(): string {
    return <string>{};
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Create a UUID for the file name
    const uuid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          // eslint-disable-next-line prefer-const
          const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    };

    const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
      },
    });
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
    });
  }
}
