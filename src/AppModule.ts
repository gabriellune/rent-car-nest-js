import { Module } from '@nestjs/common';
import { RentCarModule } from './modules/RentCarModule';

@Module({
  imports: [
    RentCarModule
  ]
})
export class AppModule { }
