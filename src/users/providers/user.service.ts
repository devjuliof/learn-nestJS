import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

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

  public findOneById(id: string) {
    return {
      name: 'joana',
      email: 'joanapaty@gmail.com',
    };
  }
}
