// main.ts
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const errorMessages = errors.map(
        (error) => `${error.property} - ${Object.values(error.constraints).join(', ')}`
      );
      return new BadRequestException(errorMessages);
    },
  }));

  
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  await app.listen(4000); // TODO : change port to config
}
bootstrap();
