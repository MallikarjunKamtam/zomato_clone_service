import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Products> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(product: Products): Promise<Products> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Products): Promise<Products> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
