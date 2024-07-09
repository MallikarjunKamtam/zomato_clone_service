//restaurents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Restaurant } from './restaurent.entity';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}
  async getAllRestaurants(): Promise<Restaurant[]> {
    console.log('ssss');
    return await this.restaurantRepository.find();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({ where: { id } });
  }

  async createRestaurant(
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return await this.restaurantRepository.create(restaurantData);
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
    // const restaurant =
    //   await this.restaurantRepository.findRestaurantWithMenu(restaurantId);
    // if (!restaurant) {
    //   throw new Error(`Restaurant with ID ${restaurantId} not found`);
    // }
    // return restaurant.menu;

    return [];
  }
}
