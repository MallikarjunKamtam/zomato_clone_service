import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';

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

  @Column({ nullable: true })
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

  @ManyToMany(() => Products)
  @JoinTable()
  menu: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
