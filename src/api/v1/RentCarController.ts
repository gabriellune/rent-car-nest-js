import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { RentCarDto } from "src/dtos/RentCarDto";
import { GiveBackCarDto } from "src/dtos/UnrentCarDto";
import { Car } from "src/models/Car";
import { RentCarService } from "src/services/RentCarService";

@Controller('api/v1/rent-car')
export class RentCarController {

    constructor(
        private readonly service: RentCarService
    ) { }

    @Get('all')
    async listAll(): Promise<Car[]> {
        return this.service.listAll()
    }

    @Post()
    async rentCar(@Body() payload: RentCarDto): Promise<void> {
        return this.service.rentCar(payload)
    }

    @Get('available')
    async listAvailable(): Promise<Car[]> {
        return this.service.listAvailable()
    }

    @Patch('give-back')
    async giveBackCar(@Body() payload: GiveBackCarDto): Promise<void> {
        return this.service.giveBackCar(payload)
    }
}