import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
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
    let author = undefined;

    try {
      author = await this.usersService.findOneById(createPostDto.authorId);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    let tags = undefined;
    try {
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return post;
  }

  public async findAll(userId: string) {
    let posts = undefined;

    try {
      posts = await this.postsRepository.find({
        relations: {
          metaOptions: true,
          //author: true,
          //tags: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return posts;
  }

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return { deleted: true, id };
  }

  public async update(patchPostsDto: PatchPostsDto) {
    // Find the tags
    let tags = undefined;
    try {
      tags = await this.tagsService.findMultipleTags(patchPostsDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Find the post
    let post = undefined;
    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostsDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!tags || tags.length !== patchPostsDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }

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

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Save the post and return
    return post;
  }
}
