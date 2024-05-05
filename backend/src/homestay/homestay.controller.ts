import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { HomestayService } from './homestay.service';
import { HomeStayCreateDTO } from './dto';
import { HomeStayUpdateDTO } from './dto/homeStayUpdate.dto';

@Controller('homestay')
export class HomestayController {
  constructor(private homeStayService: HomestayService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllHomeStays() {
    return await this.homeStayService.getAllHomeStays();
  }

  @Get(':id')
  public async getHomeStayById(@Param('id', ParseIntPipe) id: number) {
    return await this.homeStayService.getHomeStayById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHomeStay(@Body() { ownerId, ...request }: HomeStayCreateDTO) {
    return await this.homeStayService.createHomeStay(ownerId, request);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateHomeStay(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: HomeStayUpdateDTO,
  ) {
    return await this.homeStayService.updateHomeStay(id, request);
  }

  @Delete(':id')
  async deleteHomeStay(@Param('id', ParseIntPipe) id: number) {
    return await this.homeStayService.deleteHomeStay(id);
  }
}
