import { Module } from '@nestjs/common';
import { AuthenticationController } from 'src/api/v1/AuthenticationController';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { UserModule } from './UserModule';

@Module({
    imports: [
        UserModule
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
    ]
})
export class AuthenticationModule { }
