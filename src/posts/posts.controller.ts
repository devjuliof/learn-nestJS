import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './providers/dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsServices: PostsService) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postsServices.findAll(userId);
  }

  @Post()
  public createPost(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'post created';
  }
}
