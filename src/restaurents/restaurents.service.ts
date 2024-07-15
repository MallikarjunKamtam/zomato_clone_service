//restaurents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Restaurant } from './restaurent.entity';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { UserCart } from 'src/cart/cart.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(UserCart)
    private usersCartRepository: Repository<UserCart>,
  ) {}
  async getAllRestaurants(userId: number): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.find({
      order: { isOpen: 'DESC' },
    });

    const restaurantsWithCartCount = await Promise.all(
      restaurants.map(async (restaurant) => {
        const cartDetails = await this.usersCartRepository.find({
          where: { userId, restaurantId: restaurant.id },
        });

        const cartCount: number = cartDetails.reduce((prev, cur) => {
          return prev + cur.quantity;
        }, 0);

        return {
          ...restaurant,
          cartCount,
        };
      }),
    );

    return restaurantsWithCartCount;
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({ where: { id } });
  }

  async createRestaurant(
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return await this.restaurantRepository.save(restaurantData);
  }

  async updateRestaurant(
    id: number,
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    await this.restaurantRepository.update(id, restaurantData);
    return await this.getRestaurantById(id);
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }

  async getProductsByRestaurantId(restaurantId: number): Promise<Products[]> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['menu'],
    });

    if (!restaurant) {
      throw new Error(`Restaurant with id ${restaurantId} not found.`);
    }

    return restaurant.menu.map((menuProduct) => menuProduct);
  }
}
