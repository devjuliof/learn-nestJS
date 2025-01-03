import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { postStatus } from 'src/posts/enums/postStatus.enum';
import { postType } from 'src/posts/enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../../meta-options/dtos/create-post-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a title',
    description: 'This is the title of the blog post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(96)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: 'Possible values: "post", "page", "stories", "series"',
  })
  @IsEnum(postType)
  @MaxLength(96)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "For Example - 'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug shoud be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "PossibleValues 'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiProperty({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example: '{\r\n \"@context\": \"https:\/\/schema.org\"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image to your blog post',
    example: 'https://localhost.com/images/images1.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: string;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    example: ['nestjs', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
