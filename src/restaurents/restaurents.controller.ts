import { Controller, Get, Res } from '@nestjs/common';
import { restaurentsList } from './types/getRestaurents';

@Controller('restaurents')
export class RestaurentsController {
  @Get()
  async getAllRestaurents(@Res() res) {
    return res
      .status(200)
      .json({
        message: 'Fetched restaurents successfully!',
        data: restaurentsList,
      });
  }
}
