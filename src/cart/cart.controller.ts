import { Controller, Post, Body } from '@nestjs/common';
import { UsersCartService } from './cart.service';
import { UserCart } from './cart.entity';

@Controller('cart')
export class UsersCartController {
  constructor(private readonly usersCartService: UsersCartService) {}

  @Post('add')
  async addProductToCart(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ): Promise<UserCart> {
    return this.usersCartService.addProductToCart(userId, productId, quantity);
  }
}
