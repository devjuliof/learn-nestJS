import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to connect to Users table and perform bussiness operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method to get all the users from the database
   */
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

  /**
   * Find a single user using the ID of the user
   */
  public findOneById(id: string) {
    return {
      name: 'joana',
      email: 'joanapaty@gmail.com',
    };
  }
}
