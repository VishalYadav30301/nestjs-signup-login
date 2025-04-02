import { Controller,Post,Body,UsePipes,ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {  CreateUserDto, LoginUserDto} from "./user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  signUp(@Body() userData:CreateUserDto){
    return this.appService.signUp(userData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  async login(
    @Body() LoginData :LoginUserDto){
      return this.appService.login(LoginData)
    }
      
       
    }
    