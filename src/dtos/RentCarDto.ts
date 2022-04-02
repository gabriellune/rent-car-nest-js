import { IsNotEmpty, IsString } from 'class-validator'

export class RentCarDto {

    @IsString()
    @IsNotEmpty({ message: () => 'Car code is mandatory!' })
    code: string
}