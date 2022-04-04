import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from 'src/dtos/AuthenticationDto';
import { LoginDto } from 'src/dtos/LoginDto';
import { User } from 'src/models/User';
import { CryptoService } from './CryptoService';
import { UserService } from './UserService';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) { }

    async create(payload: AuthenticationDto): Promise<string> {
        try {
            await this.userService.create(payload)

            return 'User created successfully!'
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email)

        const decryptedPassword = this.cryptoService.decrypt(user.password)

        if (user && decryptedPassword === password) {
            const { password, ...result } = user
            return result as User
        }

        return null
    }

    async login(payload: any): Promise<Object> {
        const data = { email: payload.email }
        return {
            access_token: this.jwtService.sign(data)
        }
    }

}