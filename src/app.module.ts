import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    NewsModule,
    UsersModule,
    AuthModule,
    ImageUploaderModule,
    CommentModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
