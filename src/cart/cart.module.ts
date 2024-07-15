import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCart } from './cart.entity';
import { User } from '../users/user.entity';
import { Products } from '../products/products.entity';
import { UsersCartService } from './cart.service';
import { UsersCartController } from './cart.controller';
import { Restaurant } from 'src/restaurents/restaurent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCart, User, Products, Restaurant])],
  providers: [UsersCartService],
  controllers: [UsersCartController],
  exports: [UsersCartService],
})
export class UsersCartModule {}
