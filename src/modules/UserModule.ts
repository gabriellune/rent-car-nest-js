import { Module } from '@nestjs/common';
import { RentCarController } from 'src/api/v1/RentCarController';
import { RentCarRepository } from 'src/repositories/RentCarRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { CryptoService } from 'src/services/CryptoService';
import { RentCarService } from 'src/services/RentCarService';
import { UserService } from 'src/services/UserService';

@Module({
  controllers: [],
  providers: [
    UserService,
    UserRepository,
    CryptoService
  ],
  exports: [
    UserService,
    UserRepository,
    CryptoService
  ]
})
export class UserModule { }
