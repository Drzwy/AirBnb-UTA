import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomestayService } from './homestay.service';
import { HomestayCreateDTO } from './dto/homestayCreate.dto';

@Controller('homestays')
export class HomestayController {
  constructor(private homestayService: HomestayService) {}
  @Post('create')
  createHomestay(@Body() dto: HomestayCreateDTO) {
    return this.homestayService.createHomestay(dto);
  }

  @Get('getAll')
  getAllHomestays() {
    return this.homestayService.getAllHomestays();
  }
}
