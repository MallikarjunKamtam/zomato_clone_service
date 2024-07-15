import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  Get,
  Response,
} from '@nestjs/common';
import { UsersCartService } from './cart.service';
import { UserCart } from './cart.entity';
import { AddToCartDto } from './dto/addCart.dto';

@Controller('cart')
export class UsersCartController {
  constructor(private readonly usersCartService: UsersCartService) {}

  @Post('')
  async addProductToCart(
    @Body() body: AddToCartDto,
    @Request() req,
    @Response() res,
  ): Promise<UserCart> {
    const { productId } = body;

    const userId: number = req?.headers?.['user']?.['userId'] ?? 1; // todo

    const result = await this.usersCartService.addProductToCart(
      userId,
      productId,
    );

    return res
      .status(200)
      .json({ data: result, message: 'Added successfully' });
  }

  @Delete('')
  async removeFromCart(
    @Body() body: AddToCartDto,
    @Request() req,
    @Response() res,
  ): Promise<UserCart> {
    const { productId } = body;

    const userId: number = req?.headers?.['user']?.['userId'] ?? 1; // todo

    const data = await this.usersCartService.removeFromCart(userId, productId);

    return res.status(200).json({ data, message: 'Added successfully' });
  }

  @Get('')
  async getCartItemsForUser(@Request() req, @Response() res) {
    const userId: number = req?.headers?.['user']?.['userId'] ?? 1; // todo
    const data = await this.usersCartService.getCartItemsForUser(userId);
    return res.status(200).json({ data, message: 'fetched successfully' });
  }
}
