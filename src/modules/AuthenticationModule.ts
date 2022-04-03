import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from 'src/api/v1/AuthenticationController';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { LocalStrategy } from 'src/strategy/LocalStrategy';
import { UserModule } from './UserModule';

@Module({
    imports: [
        UserModule,
        PassportModule
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        LocalStrategy
    ]
})
export class AuthenticationModule { }
