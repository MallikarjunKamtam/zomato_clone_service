// restaurents.controller.ts

import { Controller, Get, Param, Res } from '@nestjs/common';
import { restaurentsList } from './types/getRestaurents';
import { RestaurantService } from './restaurents.service';
import { Products } from 'src/products/products.entity';

@Controller('restaurents')
export class RestaurentsController {
  @Get()
  async getAllRestaurents(@Res() res) {
    return res.status(200).json({
      message: 'Fetched restaurents successfully!',
      data: restaurentsList,
    });
  }
}
