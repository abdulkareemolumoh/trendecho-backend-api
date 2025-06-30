import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
// import { CreateImageUploaderDto } from './dto/create-image-uploader.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/public.decorator';

@ApiTags('image-uploader')
@Controller('image-uploader')
export class ImageUploaderController {
  constructor(private readonly imageUploaderService: ImageUploaderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.imageUploaderService.uploadFile(file);
    return { url };
  }

  @Public()
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The files have been successfully uploaded.',
    schema: {
      type: 'object',
      properties: {
        urls: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'The URLs of the uploaded files',
        },
      },
    },
  })
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const url = await this.imageUploaderService.uploadMultipleFiles(files);
    return { url };
  }

  @Get()
  findAll() {
    return this.imageUploaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageUploaderService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateImageUploaderDto: UpdateImageUploaderDto,
  // ) {
  //   return this.imageUploaderService.update(+id, updateImageUploaderDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageUploaderService.remove(+id);
  }
}
