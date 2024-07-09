import { Module } from '@nestjs/common';
import { RestaurentsService } from './restaurents.service';

@Module({
  providers: [RestaurentsService]
})
export class RestaurentsModule {}
