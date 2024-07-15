import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCart } from './cart.entity';
import { User } from '../users/user.entity';
import { Products } from '../products/products.entity';

@Injectable()
export class UsersCartService {
  constructor(
    @InjectRepository(UserCart)
    private usersCartRepository: Repository<UserCart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async addProductToCart(userId: number, productId: number): Promise<UserCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const existingCartItem = await this.usersCartRepository.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1; // making api call for each click on add to cart button so its 1
      return this.usersCartRepository.save(existingCartItem);
    }

    const newCartItem = this.usersCartRepository.create({
      user,
      product,
      userId,
      productId,
      quantity: 1, // making api call for each click on add to cart button so its 1
    });
    return await this.usersCartRepository.save(newCartItem);
  }

  async removeFromCart(userId: number, productId: number): Promise<UserCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const existingCartItem = await this.usersCartRepository.findOne({
      where: { userId, productId },
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

  async getCartItemsForUser(userId: number): Promise<UserCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const existingCartItem = await this.usersCartRepository.findOne({
      where: { userId },
    });

    if (!existingCartItem) {
      return null;
    }

    return existingCartItem;
  }
}
