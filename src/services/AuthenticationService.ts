import { Injectable } from '@nestjs/common';
import { AuthenticationDto } from 'src/dtos/AuthenticationDto';
import { User } from 'src/models/User';
import { CryptoService } from './CryptoService';
import { UserService } from './UserService';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService
    ) { }

    async create(payload: AuthenticationDto): Promise<any> {
        const result = await this.userService.create(payload)

        return result
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email)
        
        const encryptedPassword = this.cryptoService.encrypt(password)

        if (user && user.password === encryptedPassword) {
            const { password, ...result } = user
            return result as User
        }

        return null
    }

}