import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000); // TODO : NEED TO CHANGE 4000 to Config PORT
}
bootstrap();

/*
TODO LIST

- SQS
- EC2


*/
