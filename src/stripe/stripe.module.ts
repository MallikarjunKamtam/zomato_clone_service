import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from './stripe.service';
import { UserCart } from 'src/cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCart])],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
