import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Hospedaje, Propiedad } from '@prisma/client';
import { User } from 'src/user/decorator';
import { StayService } from './stay.service';
import { StayIdsDTO, SolicitStayDTO, ModifyStayDTO } from './dto';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Stays')
@UseGuards(JwtGuard)
@Controller('stays')
export class StayController {
  constructor(private stayService: StayService) {}

  @Get('all')
  getAllStays(): Promise<Hospedaje[]> {
    return this.stayService.getAllStays();
  }

  @Get('property/:id')
  getMyStaysByPropertyId(
    @Param('id', ParseIntPipe) propertyId: number,
  ): Promise<Hospedaje[]> {
    return this.stayService.getStaysByPropertyId(propertyId);
  }

  @Get('guest/me')
  getMyStaysAsGuest(@User('id') userId: number): Promise<Hospedaje[]> {
    return this.stayService.getStaysByGuestId(userId);
  }

  @Get('guest/:id')
  getMyStaysByGuestId(@Param('id') userId: number): Promise<Hospedaje[]> {
    return this.stayService.getStaysByGuestId(userId);
  }

  @Get('host/me')
  getMyStaysAsHost(
    @User('id') hostId: number,
  ): Promise<{ propiedad: Propiedad; hospedajes: Hospedaje[] }[]> {
    return this.stayService.getStaysByHostId(hostId);
  }

  @Get('host/:id')
  getMyStaysByHostId(
    @Param('id') hostId: number,
  ): Promise<{ propiedad: Propiedad; hospedajes: Hospedaje[] }[]> {
    return this.stayService.getStaysByHostId(hostId);
  }

  @Get()
  getStayById(@Body() dto: StayIdsDTO): Promise<Hospedaje> {
    return this.stayService.getStayById(dto);
  }

  @Post('solicit')
  solicitStay(@Body() dto: SolicitStayDTO): Promise<Hospedaje> {
    return this.stayService.solicitStay(dto);
  }

  @Post('accept')
  @HttpCode(HttpStatus.OK)
  acceptStay(@Body() ids: StayIdsDTO): Promise<Hospedaje> {
    return this.stayService.acceptStay(ids);
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  rejectStay(@Body() ids: StayIdsDTO): Promise<Hospedaje> {
    return this.stayService.rejectStay(ids);
  }

  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  cancelStay(@Body() ids: StayIdsDTO): Promise<Hospedaje> {
    return this.stayService.cancelStay(ids);
  }

  @Patch()
  modifyStay(@Body() dto: ModifyStayDTO): Promise<Hospedaje> {
    return this.stayService.modifyStay(dto);
  }
}
