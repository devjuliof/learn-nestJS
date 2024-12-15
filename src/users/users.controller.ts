import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(@Param('id') id: any, @Query() query: any) {
    console.log(id);
    console.log(query);
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
