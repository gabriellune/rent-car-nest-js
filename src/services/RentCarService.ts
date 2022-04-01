import { Injectable } from "@nestjs/common";
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
        return this.repository.listAll()
    }

    rentCar(payload: RentCarDto): void {
        console.log(payload)
    }

    listAvailable(): Car[] {
        return [] as Car[]
    }x

    giveBackCar(payload: GiveBackCarDto): void {
        console.log(payload)
    }
}