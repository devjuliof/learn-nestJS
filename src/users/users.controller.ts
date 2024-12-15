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
    @Body('email') email: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(ip);
    console.log(email);
    console.log(headers);
    return 'You sent a POST request to users endpoint';
  }
}
