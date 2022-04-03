import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDto {

    @IsString()
    @IsNotEmpty({ message: () => 'Name property is mandatory!' })
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: () => 'Email property is mandatory!' })
    email: string

    @IsString()
    @IsNotEmpty({ message: () => 'Password property is mandatory!' })
    password: string
}