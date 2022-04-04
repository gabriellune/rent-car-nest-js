import { IsNotEmpty, IsNumber } from 'class-validator'

export class RentCarDto {

    @IsNumber()
    @IsNotEmpty({ message: () => 'Car register code is mandatory!' })
    registerCode: number
}