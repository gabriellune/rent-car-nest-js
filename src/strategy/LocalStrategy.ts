import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/AuthenticationService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authenticationService: AuthenticationService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authenticationService.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}