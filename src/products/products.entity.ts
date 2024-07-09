import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Restaurant } from '../restaurents/restaurent.entity';
import { BaseEntity } from 'src/common/utils/base.entity';

@Entity()
export class Products extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  currency: string;

  @Column('decimal')
  rating: number;

  @Column()
  tag: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;
}
