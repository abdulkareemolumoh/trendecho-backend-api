import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
// import { UpdateImageUploaderDto } from './dto/update-image-uploader.dto';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ImageUploaderService {
  // Configuration
  constructor() {
    cloudinary.config({
      cloud_name: 'derxlvswv',
      api_key: '527513713948927',
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error: Error, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async uploadMultipleFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }

  findAll() {
    return `This action returns all imageUploader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageUploader`;
  }

  update(id: number) {
    return `This action updates a #${id} imageUploader`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageUploader`;
  }
}
