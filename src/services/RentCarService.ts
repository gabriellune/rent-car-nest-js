import { BadRequestException, Injectable } from "@nestjs/common";
import { CarDto } from "src/dtos/CarDto";
import { RentCarDto } from "src/dtos/RentCarDto";
import { GiveBackCarDto } from "src/dtos/UnrentCarDto";
import { Car } from "src/models/Car";
import { RentCarRepository } from "src/repositories/RentCarRepository";
import { decodeAuth } from "src/utils/DecodeAuth";

@Injectable()
export class RentCarService {

    constructor(
        private readonly repository: RentCarRepository
    ) { }

    async listAll(): Promise<Car[]> {
        const result = await this.repository.listAll()

        return result
    }

    async rentCar({ registerCode }: RentCarDto, auth: string): Promise<string> {
        const user = decodeAuth(auth)

        const userHasRentedCar = await this.repository.checkUserHasRentedCar(user)

        if(userHasRentedCar) {
            throw new BadRequestException('Give back your car to rent another!')
        }

        const existentCar = await this.repository.getCarByCode(registerCode)

        if (!existentCar) {
            throw new BadRequestException('No cars registered with this code!')
        }

        if (!existentCar.available) {
            throw new BadRequestException('The selected car is not available!')
        }

        try {
            existentCar.available = false
            existentCar.rentedBy = user
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

    async giveBackCar(auth: string): Promise<string> {
        const user = decodeAuth(auth)

        const userHasRentedCar = await this.repository.checkUserHasRentedCar(user)

        if(!userHasRentedCar) {
            throw new BadRequestException('You dont have a car rented!')
        }

        try {
            userHasRentedCar.available = true
            userHasRentedCar.rentedBy = null
            await this.repository.rentOrGiveBackCar(userHasRentedCar)

            return 'Car give back successfully'
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async registerNewCar(payload: CarDto): Promise<string> {
        const { name } = payload

        const carList = await this.listAll()

        const data: Car = {
            name,
            available: true,
            registerCode: !carList ? 1 : carList.length + 1,
            rentedBy: null
        }

        await this.repository.createCar(data)


        return 'Car registered successfully!'
    }
}