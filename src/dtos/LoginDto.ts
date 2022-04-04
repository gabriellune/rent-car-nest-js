import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: () => 'Email property is mandatory!' })
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty({ message: () => 'Password property is mandatory!' })
    @ApiProperty()
    password: string
}