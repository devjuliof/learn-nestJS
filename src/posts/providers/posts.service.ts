import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostsDto } from './dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);

    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        //author: true,
        //tags: true,
      },
    });

    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }

  public async update(patchPostsDto: PatchPostsDto) {
    // Find the tags
    const tags = await this.tagsService.findMultipleTags(patchPostsDto.tags);

    // Find the post
    const post = await this.postsRepository.findOneBy({
      id: patchPostsDto.id,
    });

    // Update the properties
    post.title = patchPostsDto.title ?? post.title;
    post.content = patchPostsDto.content ?? post.content;
    post.status = patchPostsDto.status ?? post.status;
    post.postType = patchPostsDto.postType ?? post.postType;
    post.slug = patchPostsDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostsDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostsDto.publishOn ?? post.publishOn;

    post.tags = tags;

    // Save the post and return
    return await this.postsRepository.save(post);
  }
}
