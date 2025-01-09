import { SignInProvider } from './signin.provider';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {
    console.log('AuthService instantiated');
  }

  public async signIn(signInDto: SignInDto) {
    console.log(this.signInProvider);
    return await this.signInProvider.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}
