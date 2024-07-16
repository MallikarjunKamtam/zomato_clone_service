// app.module.ts

import { Module } from '@nestjs/common';
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
    AuthModule,
    UsersModule,
    RestaurantModule,
    ProductsModule,
    UsersCartModule,
    StripeModule,
  ],
  controllers: [
    AppController,
    RestaurentsController,
    ProductsController,
    StripeController,
  ],
  providers: [RestaurantService, AppService],
})
export class AppModule {}
