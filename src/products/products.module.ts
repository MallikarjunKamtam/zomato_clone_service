import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from './products.entity';
import { UsersCartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), UsersCartModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
