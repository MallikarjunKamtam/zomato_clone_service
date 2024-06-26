// main.ts
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = errors.map(
          (error) =>
            `${error.property} - ${Object.values(error.constraints).join(', ')}`,
        );
        return new BadRequestException(errorMessages);
      },
    }),
  );

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  const port = configService.get<number>('PORT');

  await app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT ${port}.....`);
  });
}
bootstrap();
