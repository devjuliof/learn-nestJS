import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './providers/dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostsDto } from './providers/dtos/patch-post.dto';
import { GetPostsDto } from './providers/dtos/get-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsServices: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsServices.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post was created sucessfuly',
  })
  @Post()
  public create(@Body() createPostDto: CreatePostDto) {
    return this.postsServices.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated sucessfuly',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostsDto) {
    return this.postsServices.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsServices.delete(id);
  }
}
