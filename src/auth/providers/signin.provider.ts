import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/user.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // Find the user using email ID
    // Throw an exception user not found
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare password to the hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }

    // Send confirmation
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    return true;
  }
}
