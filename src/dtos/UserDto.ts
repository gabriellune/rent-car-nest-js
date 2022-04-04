import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDto {

    @IsString()
    @IsNotEmpty({ message: () => 'Name property is mandatory!' })
    @ApiProperty()
    name: string

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