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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Homestays')
@Controller('homestays')
export class HomestayController {
  constructor(private homeStayService: HomestayService) {}

  @Get('get')
  @HttpCode(HttpStatus.OK)
  public async getAllHomeStays() {
    return await this.homeStayService.getAllHomeStays();
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  public async getHomeStayById(@Param('id', ParseIntPipe) id: number) {
    return await this.homeStayService.getHomeStayById(id);
  }

  @Get('get/userHouses/:id')
  @HttpCode(HttpStatus.OK)
  public async getHomeStayByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.homeStayService.getAllHomeStaysByUserId(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createHomeStay(@Body() request: HomeStayCreateDTO) {
    return await this.homeStayService.createHomeStay(request);
  }

  @Patch('patch/:id')
  @HttpCode(HttpStatus.OK)
  async updateHomeStay(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: HomeStayUpdateDTO,
  ) {
    return await this.homeStayService.updateHomeStay(id, request);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteHomeStay(@Param('id', ParseIntPipe) id: number) {
    return await this.homeStayService.deleteHomeStay(id);
  }
}
