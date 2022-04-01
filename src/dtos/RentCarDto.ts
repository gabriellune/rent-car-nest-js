import { IsNotEmpty, IsNumber } from 'class-validator'

export class RentCarDto {

    @IsNotEmpty()
    @IsNumber()
    code: number
}