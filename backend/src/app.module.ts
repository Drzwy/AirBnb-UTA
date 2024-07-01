import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HomestayModule } from './homestay/homestay.module';
import { StayModule } from './stay/stay.module';
import { ReviewModule } from './review/review.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    HomestayModule,
    StayModule,
    ReviewModule,
    PaymentMethodModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
