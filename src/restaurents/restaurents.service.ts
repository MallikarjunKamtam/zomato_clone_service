import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantRepository } from './restaurant.repository';
import { Restaurant } from './restaurent.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}
  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findAllRestaurants();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    return await this.restaurantRepository.findRestaurantById(id);
  }

  async createRestaurant(
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return await this.restaurantRepository.createRestaurant(restaurantData);
  }

  async updateRestaurant(
    id: number,
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return await this.restaurantRepository.updateRestaurant(id, restaurantData);
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.restaurantRepository.deleteRestaurant(id);
  }
}
