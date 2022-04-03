import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: () => 'Email property is mandatory!' })
    email: string

    @IsString()
    @IsNotEmpty({ message: () => 'Password property is mandatory!' })
    password: string
}