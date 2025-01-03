import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    let newPost = this.postsRepository.create(createPostDto);
    newPost = await this.postsRepository.save(newPost);

    return newPost;
  }

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'Teste title',
        content: 'Test Content',
      },
      {
        user: user,
        title: 'Teste title 2',
        content: 'Test Content 2',
      },
    ];
  }
}
