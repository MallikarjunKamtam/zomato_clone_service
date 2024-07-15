import { Products } from 'src/products/products.entity';
import { Restaurant } from 'src/restaurents/restaurent.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_cart' })
export class UserCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Products, (product) => product.carts)
  @JoinColumn({ name: 'productId' })
  product: Products;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.carts)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column()
  productId: number;

  @Column()
  restaurantId: number;
}
