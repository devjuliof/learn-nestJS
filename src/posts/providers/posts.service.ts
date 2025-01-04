import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);

    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find();

    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
