import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';

@Injectable()
export class AppService {

  constructor (@InjectModel(User.name) private userModel: Model<User>){}

  
  async signUp(userData: CreateUserDto ): Promise<any>{
    const { email, password, name, mobileNumber }= userData;

    const existingUser = await this.userModel.findOne({email});
    if(existingUser){
      throw new UnauthorizedException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);


    const createUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
      mobileNumber
    });
   await createUser.save();

   const { password: _, ...userWithoutPassword } = createUser.toObject();
    return {
      message: 'User created successfully',
      user: userWithoutPassword
    };
  }
 

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

 
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    return {
      message: 'Login successful',
      user: userWithoutPassword
    };
  }

}
