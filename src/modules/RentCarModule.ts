import { Module } from '@nestjs/common';
import { RentCarController } from 'src/api/v1/RentCarController';
import { RentCarRepository } from 'src/repositories/RentCarRepository';
import { RentCarService } from 'src/services/RentCarService';

@Module({
  controllers: [
    RentCarController
  ],
  providers: [
    RentCarService,
    RentCarRepository
  ],
})
export class RentCarModule { }
