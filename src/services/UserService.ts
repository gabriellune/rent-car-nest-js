import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto } from "src/dtos/UserDto";
import { UserRepository } from "src/repositories/UserRepository";
import { CryptoService } from "./CryptoService";

@Injectable()
export class UserService {

    constructor(
        private readonly cryptoService: CryptoService,
        private readonly repository: UserRepository
    ) { }

    async create(payload: UserDto): Promise<any> {
        const data = payload

        const existentUser = await this.repository.findByEmail(data.email)

        if (existentUser) {
            throw new BadRequestException('This email already have being used!')
        }
        try {

            data.password = this.cryptoService.encrypt(data.password)

            await this.repository.create(data)
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }
}