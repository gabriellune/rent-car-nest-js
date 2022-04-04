import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CarDto } from "src/dtos/CarDto";
import { RentCarDto } from "src/dtos/RentCarDto";
import { Car } from "src/models/Car";
import { RentCarService } from "src/services/RentCarService";
import { JwtAuthGuard } from "src/shared/JwtAuthGuard";

@Controller('rent-car')
@ApiTags('Rent Car')
export class RentCarController {

    constructor(
        private readonly service: RentCarService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('register-new-car')
    @ApiOperation({ summary: 'Register new cars'})
    @ApiBearerAuth()
    async registerNewCar(@Body() payload: CarDto): Promise<string> {
        return this.service.registerNewCar(payload)
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    @ApiOperation({ summary: 'List all cars'})
    @ApiBearerAuth()
    async listAll(): Promise<Car[]> {
        return this.service.listAll()
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Rent a car'})
    async rentCar(@Body() payload: RentCarDto, @Headers() headers): Promise<string> {
        return this.service.rentCar(payload, headers.authorization)
    }

    @UseGuards(JwtAuthGuard)
    @Get('available')
    @ApiOperation({ summary: 'List only available cars'})
    @ApiBearerAuth()
    async listAvailable(): Promise<Car[]> {
        return this.service.listAvailable()
    }

    @UseGuards(JwtAuthGuard)
    @Patch('give-back')
    @ApiOperation({ summary: 'Give back your car'})
    @ApiBearerAuth()
    async giveBackCar(@Headers() headers): Promise<string> {
        return this.service.giveBackCar(headers.authorization)
    }
}