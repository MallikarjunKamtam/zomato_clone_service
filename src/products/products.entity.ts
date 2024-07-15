import { UserCart } from 'src/cart/cart.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ nullable: true })
  tag: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserCart, (usersCart) => usersCart.product)
  carts: UserCart[];
}
