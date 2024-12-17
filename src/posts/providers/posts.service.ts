import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/user.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'Teste title',
        content: 'Test Content',
      },
      {
        user: user,
        title: 'Teste title 2',
        content: 'Test Content 2',
      },
    ];
  }
}
