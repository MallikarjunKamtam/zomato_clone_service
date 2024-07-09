// restaurant.repository.ts

import { Repository } from 'typeorm';
import { Restaurant } from './restaurent.entity';

export class RestaurantRepository extends Repository<Restaurant> {
  async findAllRestaurants(): Promise<Restaurant[]> {
    return await this.find();
  }

  async findRestaurantById(id: number): Promise<Restaurant> {
    return await this.findOne({ where: { id } });
  }

  async createRestaurant(
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    const restaurant = this.create(restaurantData);
    return await this.save(restaurant);
  }

  async updateRestaurant(
    id: number,
    restaurantData: Partial<Restaurant>,
  ): Promise<Restaurant> {
    await this.update(id, restaurantData);
    return await this.findOne({ where: { id } });
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.delete(id);
  }
}
