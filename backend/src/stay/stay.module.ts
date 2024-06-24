import { Module } from '@nestjs/common';
import { StayService } from './stay.service';
import { StayController } from './stay.controller';
import { HomestayModule } from 'src/homestay/homestay.module';

@Module({
  providers: [StayService],
  controllers: [StayController],
  imports: [HomestayModule],
})
export class StayModule {}
