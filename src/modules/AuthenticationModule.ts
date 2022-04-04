import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from 'src/api/v1/AuthenticationController';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { jwtConstants, JwtStrategy } from 'src/shared/JwtStrategy';
import { LocalStrategy } from 'src/shared/LocalStrategy';
import { UserModule } from './UserModule';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' }
        })
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthenticationModule { }
