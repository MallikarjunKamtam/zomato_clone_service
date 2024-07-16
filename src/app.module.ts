import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';
import { RestaurentsController } from './restaurents/restaurents.controller';
import { ProductsModule } from './products/products.module';
import { RestaurantModule } from './restaurents/restaurents.module';
import { RestaurantService } from './restaurents/restaurents.service';
import { Restaurant } from './restaurents/restaurent.entity';
import { UsersCartModule } from './cart/cart.module';
import { UserCart } from './cart/cart.entity';
import { StripeController } from './stripe/stripe.controller';
import { StripeModule } from './stripe/stripe.module';

import { MyLoggerService } from './common/logger/logger.service';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { CognitoService } from './auth/cognito/cognito.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([Restaurant, UserCart]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
    UsersModule,
    RestaurantModule,
    ProductsModule,
    UsersCartModule,
    StripeModule,
  ],
  controllers: [
    AuthController,
    AppController,
    RestaurentsController,
    ProductsController,
    StripeController,
  ],
  providers: [
    MyLoggerService,
    RestaurantService,
    AppService,
    CognitoService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
