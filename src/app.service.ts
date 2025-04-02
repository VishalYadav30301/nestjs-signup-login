import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class AppService {
  private users: CreateUserDto[]= [];
  
  signUp(userData: CreateUserDto ){
    this.users.push(userData);
    return{message: 'User signed up successfully', user: userData};
  }
 

  login(LoginData : LoginUserDto){
    const user= this.users.find(user => user.email === LoginData.email);
    if(!user){
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== LoginData.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
     return{
      message:"Login Successfull",
      user:{
        email: user.email,
        name: user.name,
        mobileNumber: user.mobileNumber
      }
     };
  }
}
