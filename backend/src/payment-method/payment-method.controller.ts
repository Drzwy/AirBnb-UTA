import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/decorator';
import { PaymentMethodService } from './payment-method.service';
import { CreatePMDTO, ModifyPMDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private pmService: PaymentMethodService) {}

  @Get()
  getAllPaymentMethods() {
    return this.pmService.getAllPM();
  }

  @Get('/me')
  getPaymentMethodsFromLoggedUser(@User('id') userId: number) {
    return this.pmService.getPMsFromUserId(userId);
  }

  @Get('/user/:userid/:pmid')
  getPaymentMethodWithIDs(
    @Param('userid', ParseIntPipe) userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
  ) {
    return this.pmService.getPMFromUserIdById(userId, pmId);
  }

  @Get('/me/:pmid')
  getPaymentMethodFromLoggedUserById(
    @User('id') userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
  ) {
    return this.pmService.getPMFromUserIdById(userId, pmId);
  }

  @Post('/user/:userid')
  createPaymentMethodWithUserId(
    @Param('userid', ParseIntPipe) userId: number,
    @Body() dto: CreatePMDTO,
  ) {
    return this.pmService.createNewPM(userId, dto);
  }

  @Post('/me')
  createPaymentMethodForLoggedUser(
    @User('id') userId: number,
    @Body() dto: CreatePMDTO,
  ) {
    return this.pmService.createNewPM(userId, dto);
  }

  @Patch('/user/:userid/:pmid')
  modifyPaymentMethodUsingIDs(
    @Param('userid', ParseIntPipe) userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
    @Body() dto: ModifyPMDTO,
  ) {
    return this.pmService.modifyPM(userId, pmId, dto);
  }

  @Patch('/me/:pmid')
  modifyPaymentMethodForLoggedUserByPMId(
    @User('id') userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
    @Body() dto: ModifyPMDTO,
  ) {
    return this.pmService.modifyPM(userId, pmId, dto);
  }

  @Delete('/user/:userid/:pmid')
  deletePaymentMethodUsingIDs(
    @Param('userid', ParseIntPipe) userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
  ) {
    return this.pmService.deletePM(userId, pmId);
  }

  @Delete('/me/:pmid')
  deletePaymentMethodForLoggedUserByPMId(
    @User('id') userId: number,
    @Param('pmid', ParseIntPipe) pmId: number,
  ) {
    return this.pmService.deletePM(userId, pmId);
  }
}
