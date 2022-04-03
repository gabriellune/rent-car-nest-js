import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/AuthenticationModule';
import { RentCarModule } from './modules/RentCarModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [
    RentCarModule,
    UserModule,
    AuthenticationModule
  ]
})
export class AppModule { }
