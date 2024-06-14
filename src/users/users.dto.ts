import { IsOptional, MaxLength, MinLength, IsString, IsEmail, IsUrl, IsNumber } from "class-validator";

export class UsersDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsUrl()
    @IsOptional()
    pfp?: string;
}