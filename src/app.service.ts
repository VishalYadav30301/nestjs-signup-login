import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Injectable()
export class AppService {
  private users: CreateUserDto[]= [];
  signUp(userData: any ){
    this.users.push(userData);
    return{message: 'User signed up successfully', user: userData};
  }
 
}
