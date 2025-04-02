import { Controller,Post,Body,UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {  CreateUserDto} from "./user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() userData:CreateUserDto){
    return this.appService.signUp(userData);
  }
  
}

