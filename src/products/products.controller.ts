import { Controller, Get, Param, Res } from '@nestjs/common';
import { IGetProducts, dummyProductsList } from './types/getProducts';

@Controller('products')
export class ProductsController {
  @Get()
  async findAllProduct(@Res() res) {
    return res.status(200).json({
      message: 'Fetched products successfully!',
      data: dummyProductsList,
    });
  }

  @Get('/:restaurentId')
  async findAllProductForRestaurent(
    @Param('restaurentId') restaurentId: number,
    @Res() res,
  ) {
    return res.status(200).json({
      message: 'Fetched products successfully!',
      data: dummyProductsList,
    });
  }
}
