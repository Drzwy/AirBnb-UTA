import { Module } from '@nestjs/common';
import { StayService } from './stay.service';
import { StayController } from './stay.controller';

@Module({
  providers: [StayService],
  controllers: [StayController],
})
export class StayModule {}
