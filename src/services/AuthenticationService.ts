import { Injectable } from '@nestjs/common';
import { AuthenticationDto } from 'src/dtos/AuthenticationDto';
import { UserService } from './UserService';

@Injectable()
export class AuthenticationService {
    constructor(
        private usersService: UserService
    ) { }

    async create(payload: AuthenticationDto): Promise<any> {
        const result = await this.usersService.create(payload)

        return result
    }

}