import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CarDto {

    @IsString()
    @IsNotEmpty({ message: () => 'Name property is mandatory!' })
    name: string
}