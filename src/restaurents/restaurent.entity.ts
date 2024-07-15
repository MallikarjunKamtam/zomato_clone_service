import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Products } from '../products/products.entity';
import { UserCart } from 'src/cart/cart.entity';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isOpen: boolean;

  @Column()
  location: string;

  @Column({ nullable: true, default: '9999999999' })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  timingsOpen: string;

  @Column()
  timingsClose: string;

  @Column()
  ownerName: string;

  @Column('decimal')
  rating: number;

  @ManyToMany(() => Products)
  @JoinTable()
  menu: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserCart, (usersCart) => usersCart.restaurant)
  carts: UserCart[];

  @Column({
    default: 'https://dummyimage.com/600x400/000/fff&text=RestaurantName',
  })
  imageUrl: string;
}
