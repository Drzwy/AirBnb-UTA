import { Module } from '@nestjs/common';
import { HomestayController } from './homestay.controller';
import { HomestayService } from './homestay.service';

@Module({
  providers: [HomestayService],
  exports: [HomestayService],
  controllers: [HomestayController],
})
export class HomestayModule {}
