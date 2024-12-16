import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  public findAll(getUserParamDto: GetUsersParamDto) {
    console.log('Buscando no banco de dados o ID...');
    return [
      {
        name: 'john',
        email: 'johnvlogs@gmial.com',
      },
      {
        name: 'joana',
        email: 'joanapaty@gmail.com',
      },
    ];
  }
}
