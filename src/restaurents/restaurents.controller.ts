// restaurents.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { IGetRestaurent } from './types/getRestaurents';
import { RestaurantService } from './restaurents.service';
import { Products } from 'src/products/products.entity';
import { ProductsService } from 'src/products/products.service';

@Controller('restaurents')
export class RestaurentsController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly productsSerivce: ProductsService,
  ) {}

  @Get()
  async getAllRestaurents(@Res() res) {
    const results = await this.restaurantService.getAllRestaurants();

    return res.status(200).json({
      message: 'Fetched restaurents successfully!',
      data: results,
    });
  }

  @Get(':id/products')
  async getProductsByRestaurantId(
    @Res() res,
    @Param('id') id: string,
  ): Promise<Products[]> {
    const restaurantId = parseInt(id, 10);
    const results =
      await this.restaurantService.getProductsByRestaurantId(restaurantId);
    return res.status(200).json({
      message: 'Fetched restaurents successfully!',
      data: results,
    });
  }

  @Post('add-many')
  async addManyRestaurants(@Response() res, @Body() body: IGetRestaurent[]) {
    const added = [];

    for await (const restaurant of body) {
      const {
        name,
        location,
        email,
        isOpen,
        menu,
        ownerName,
        phoneNumber,
        rating,
        timings,
      } = restaurant;

      const menuList = await Promise.all(
        menu.map((item) => this.productsSerivce.findOne(item)),
      );

      const addedRestaurant = await this.restaurantService.createRestaurant({
        email,
        isOpen,
        location,
        name,
        ownerName,
        phoneNumber,
        rating,
        timingsClose: timings.close,
        timingsOpen: timings.open,
        menu: menuList,
      });

      added.push(addedRestaurant.id);
    }

    return res.status(200).json({ added });
  }
}
