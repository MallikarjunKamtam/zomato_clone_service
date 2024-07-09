import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { IGetProducts } from './types/getProducts';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAllProduct(@Res() res) {
    const results = await this.productService.findAll();

    return res.status(200).json({
      message: 'Fetched products successfully!',
      data: results,
    });
  }

  // @Get('/:restaurentId')
  // async findAllProductForRestaurent(
  //   @Param('restaurentId') restaurentId: number,
  //   @Res() res,
  // ) {
  //   return res.status(200).json({
  //     message: 'Fetched products successfully!',
  //     data: dummyProductsList,
  //   });
  // }

  @Post('add-many')
  async addManyProducts(@Body() body: IGetProducts[], @Response() res) {
    const added = [];

    for await (const product of body) {
      const { currency, name, price, imageUrl, rating, tag } = product;

      const addedProduct = await this.productService.create({
        currency,
        imageUrl,
        name,
        price,
        rating,
        tag,
      });

      added.push(addedProduct.id);
    }

    return res.status(200).json({ added });
  }
}
