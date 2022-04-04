import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class RentCarDto {

    @IsNumber()
    @IsNotEmpty({ message: () => 'Car register code is mandatory!' })
    @ApiProperty()
    registerCode: number
}