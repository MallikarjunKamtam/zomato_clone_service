import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCart } from './cart.entity';
import { User } from '../users/user.entity';
import { Products } from '../products/products.entity';
import { Restaurant } from 'src/restaurents/restaurent.entity';

@Injectable()
export class UsersCartService {
  constructor(
    @InjectRepository(UserCart)
    private usersCartRepository: Repository<UserCart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async addProductToCart(
    userId: number,
    productId: number,
    restaurantId: number,
  ): Promise<UserCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });

    if (!user || !product || !restaurant) {
      throw new Error('User or Product not found');
    }

    const existingCartItem = await this.usersCartRepository.findOne({
      where: { userId, productId, restaurantId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1; // making api call for each click on add to cart button so its 1
      return this.usersCartRepository.save(existingCartItem);
    }

    const newCartItem = this.usersCartRepository.create({
      user,
      product,
      restaurant,
      userId,
      productId,
      restaurantId,
      quantity: 1, // making api call for each click on add to cart button so its 1
    });
    return await this.usersCartRepository.save(newCartItem);
  }

  async removeFromCart(
    userId: number,
    productId: number,
    restaurantId: number,
  ): Promise<UserCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });

    if (!user || !product || !restaurant) {
      throw new Error('User or Product not found');
    }

    const existingCartItem = await this.usersCartRepository.findOne({
      where: { userId, productId, restaurantId },
    });

    if (!existingCartItem) {
      throw new Error('Cart is already empty');
    }

    if (existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1; // making api call for each click on add to cart button so its 1
      return this.usersCartRepository.save(existingCartItem);
    }

    await this.usersCartRepository.delete(existingCartItem.id);
  }

  async getCartItemsForUser(
    userId: number,
    restaurantId: number,
  ): Promise<{ [key: string]: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const existingCartItem = await this.usersCartRepository.find({
      where: { userId, restaurantId },
    });

    if (!existingCartItem) {
      return null;
    }

    const output = existingCartItem.reduce((prev, { productId, quantity }) => {
      prev[productId] = quantity;
      return prev;
    }, {});

    return output;
  }
}
