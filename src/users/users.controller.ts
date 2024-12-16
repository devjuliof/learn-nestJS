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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/user.service';

@Controller('users')
export class UsersController {
  constructor(
    // Inject Users Service
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id')
  public getUsers(@Param() getUserParamDto: GetUsersParamDto) {
    return this.usersService.findAll(getUserParamDto);
  }

  @Post()
  public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'You sent a POST request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return patchUserDto;
  }
}
