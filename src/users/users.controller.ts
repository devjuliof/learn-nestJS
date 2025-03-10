import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  ValidationPipe,
  DefaultValuePipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/user.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched succesfuly based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 10,
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query() postQuery: GetUsersDto,
  ) {
    return this.usersService.findAll(getUserParamDto, postQuery);
  }

  @Post()
  public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUsers(
    @Body(new ValidationPipe()) createManyUsersDto: CreateManyUsersDto,
  ) {
    return this.usersService.createMany(createManyUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
