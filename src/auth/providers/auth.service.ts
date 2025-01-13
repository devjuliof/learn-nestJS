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
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}
