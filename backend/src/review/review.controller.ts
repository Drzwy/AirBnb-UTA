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
import {
  CreateHomeStayReviewDTO,
  CreateUserReviewDTO,
  DeleteReviewDTO,
  GetReviewBatch,
  ModifyReviewDTO,
} from './dto';
import { ReviewService, ReviewType } from './review.service';
import { User } from 'src/user/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(JwtGuard)
  @Get('users')
  getAllUserReviews() {
    return this.reviewService.getAllUserReviews();
  }

  @Post('users/batch')
  getUserReviewsForIdBatch(@Body() dto: GetReviewBatch) {
    return this.reviewService.getUserReviewsForIdBatch(dto);
  }

  @UseGuards(JwtGuard)
  @Get('homestays')
  getAllHomeStayReviews() {
    return this.reviewService.getAllHomeStayReviews();
  }

  @Post('homestays/batch')
  getHomeStayReviewsForIdBatch(@Body() dto: GetReviewBatch) {
    return this.reviewService.getHomeStayReviewsForIdBatch(dto);
  }

  @Get(':id')
  getAllReviewsMadeByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.getAllReviewsFromUser(userId);
  }

  @Get('users/:id')
  getAllReviewsForUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.getAllReviewsForUser(userId);
  }

  @Get('homestays/:id')
  getAllReviewsForHomeStayById(@Param('id', ParseIntPipe) homestayId: number) {
    return this.reviewService.getAllReviewsForHomeStay(homestayId);
  }

  @UseGuards(JwtGuard)
  @Post('users')
  createReviewFromLoggedUserForUser(
    @User('id') userId: number,
    @Body() dto: CreateUserReviewDTO,
  ) {
    return this.reviewService.createReviewForUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Post('homestays')
  createReviewFromLoggedUserForHomeStayById(
    @User('id') userId: number,
    @Body() dto: CreateHomeStayReviewDTO,
  ) {
    return this.reviewService.createReviewForHomeStay(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('users')
  modifyUserReviewById(@Body() dto: ModifyReviewDTO) {
    return this.reviewService.modifyReview(dto, ReviewType.USER);
  }

  @UseGuards(JwtGuard)
  @Patch('homestays')
  modifyHomeStayReviewById(@Body() dto: ModifyReviewDTO) {
    return this.reviewService.modifyReview(dto, ReviewType.HOMESTAY);
  }

  @UseGuards(JwtGuard)
  @Delete('users')
  deleteUserReviewById(@Body() dto: DeleteReviewDTO) {
    return this.reviewService.deleteReview(dto, ReviewType.USER);
  }

  @UseGuards(JwtGuard)
  @Delete('homestays')
  deleteHomeStayReviewById(@Body() dto: DeleteReviewDTO) {
    return this.reviewService.deleteReview(dto, ReviewType.HOMESTAY);
  }
}
