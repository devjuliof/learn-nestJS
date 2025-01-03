import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './providers/dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostsDto } from './providers/dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsServices: PostsService) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postsServices.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post was created sucessfuly',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsServices.createPost(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated sucessfuly',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    console.log(patchPostsDto);
  }
}
