import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(@Param() getUserParamDto: GetUsersParamDto) {
    console.log(getUserParamDto);
    return 'You sent a GET request to users endpoint';
  }

  @Post()
  public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'You sent a POST request to users endpoint';
  }
}
