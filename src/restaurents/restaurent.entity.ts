import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Products } from '../products/products.entity';

@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isOpen: boolean;

  @Column()
  location: string;

  @Column()
  phoneNumber: number;

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

  @OneToMany(() => Products, (product) => product.restaurant)
  menu: Products[];
}
