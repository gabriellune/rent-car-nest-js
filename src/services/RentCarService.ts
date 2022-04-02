import { BadRequestException, Injectable } from "@nestjs/common";
import { RentCarDto } from "src/dtos/RentCarDto";
import { GiveBackCarDto } from "src/dtos/UnrentCarDto";
import { Car } from "src/models/Car";
import { RentCarRepository } from "src/repositories/RentCarRepository";

@Injectable()
export class RentCarService {

    constructor(
        private readonly repository: RentCarRepository
    ) { }

    async listAll(): Promise<Car[]> {
        const result = await this.repository.listAll()

        if (!result) {
            throw new BadRequestException('No cars registered!')
        }

        return result
    }

    async rentCar({ code }: RentCarDto): Promise<string> {
        const existentCar = await this.repository.getCarByCode(code)

        if (!existentCar) {
            throw new BadRequestException('No cars registered with this code!')
        }

        try {
            existentCar.available = false
            await this.repository.rentOrGiveBackCar(existentCar)

            return 'Car rented successfully'
        }
        catch (err) {
            throw new BadRequestException(err)
        }

    }

    async listAvailable(): Promise<Car[]> {
        const result = await this.repository.listAvailable()

        if (!result) {
            throw new BadRequestException('No cars available!')
        }

        return result
    }

    async giveBackCar({ code }: GiveBackCarDto): Promise<string> {
        const existentCar = await this.repository.getCarByCode(code)

        if (!existentCar) {
            throw new BadRequestException('No cars registered with this code!')
        }

        try {
            existentCar.available = true
            await this.repository.rentOrGiveBackCar(existentCar)

            return 'Car give back successfully'
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }
}