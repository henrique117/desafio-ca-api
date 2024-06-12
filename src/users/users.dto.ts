import { IsOptional, IsUUID, MaxLength, MinLength, IsString, IsEmail, IsUrl } from "class-validator";

export class UsersDto {
    @IsUUID()
    @IsOptional()
    id: string;

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
    pfp: string;
}