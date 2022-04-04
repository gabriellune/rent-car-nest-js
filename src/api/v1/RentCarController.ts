import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from "@nestjs/common";
import { CarDto } from "src/dtos/CarDto";
import { RentCarDto } from "src/dtos/RentCarDto";
import { GiveBackCarDto } from "src/dtos/UnrentCarDto";
import { Car } from "src/models/Car";
import { RentCarService } from "src/services/RentCarService";
import { JwtAuthGuard } from "src/shared/JwtAuthGuard";

@Controller('rent-car')
export class RentCarController {

    constructor(
        private readonly service: RentCarService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('register-new-car')
    async registerNewCar(@Body() payload: CarDto): Promise<string> {
        return this.service.registerNewCar(payload)
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async listAll(): Promise<Car[]> {
        return this.service.listAll()
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async rentCar(@Body() payload: RentCarDto, @Headers() headers): Promise<string> {
        return this.service.rentCar(payload, headers.authorization)
    }

    @UseGuards(JwtAuthGuard)
    @Get('available')
    async listAvailable(): Promise<Car[]> {
        return this.service.listAvailable()
    }

    @UseGuards(JwtAuthGuard)
    @Patch('give-back')
    async giveBackCar(@Headers() headers): Promise<string> {
        return this.service.giveBackCar(headers.authorization)
    }
}