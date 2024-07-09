import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurent.entity';
import { Products } from '../products/products.entity';
import { RestaurantService } from './restaurents.service';
import { RestaurentsController } from './restaurents.controller';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRepository])],
  providers: [RestaurantService],
  controllers: [RestaurentsController],
  exports: [TypeOrmModule],
})
export class RestaurantModule {}
