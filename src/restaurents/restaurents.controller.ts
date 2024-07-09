// restaurents.controller.ts

import { Controller, Get, Param, Res } from '@nestjs/common';
import { restaurentsList } from './types/getRestaurents';
import { RestaurantService } from './restaurents.service';
import { Products } from 'src/products/products.entity';

@Controller('restaurents')
export class RestaurentsController {
  constructor(private readonly restaurantService: RestaurantService) {}

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
    @Param('id') id: string,
  ): Promise<Products[]> {
    const restaurantId = parseInt(id, 10);
    return this.restaurantService.getProductsByRestaurantId(restaurantId);
  }
}
