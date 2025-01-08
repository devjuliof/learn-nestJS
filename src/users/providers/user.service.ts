import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserDto } from './../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetUsersDto } from '../dtos/get-users.dto';

/**
 * Class to connect to Users table and perform bussiness operations
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      // Check if user exists with the same email
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check you email.',
      );
    }

    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    console.log(newUser);
    debugger;
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
  }
  /**
   * The method to get all the users from the database
   */
  public async findAll(
    getUserParamDto: GetUsersParamDto,
    postQuery: GetUsersDto,
  ) {
    let users = undefined;

    try {
      users = await this.paginationProvider.paginateQuery(
        {
          limit: postQuery.limit,
          page: postQuery.page,
        },
        this.usersRepository,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return users;
  }

  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle the user does not exist
    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
