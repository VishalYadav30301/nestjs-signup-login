import { IsEmail,IsString, MinLength,IsPhoneNumber, IsOptional, IsNotEmpty } from "class-validator";

export class CreateUserDto{

 @IsEmail()
 email:string;

 @IsString()
 @MinLength(3)
 name:string;

 @IsString()
 @MinLength(8)
 password:string;

 @IsPhoneNumber()
 @IsOptional()
 mobileNumber: string;
 
}

export class LoginUserDto{
    @IsEmail()
    email:string;
    
    @IsString()
    password:string;
}