import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurent.entity';
import { Products } from '../products/products.entity';
import { RestaurantService } from './restaurents.service';
import { RestaurentsController } from './restaurents.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]), ProductsModule],
  providers: [RestaurantService],
  controllers: [RestaurentsController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
