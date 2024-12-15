import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    console.log(typeof id);
    return 'You sent a GET request to users endpoint';
  }

  @Post()
  public createUsers(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log(name);
    console.log(email);
    console.log(password);
    return 'You sent a POST request to users endpoint';
  }
}
