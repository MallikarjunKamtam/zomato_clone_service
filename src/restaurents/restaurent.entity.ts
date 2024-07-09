import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Products } from '../products/products.entity';
import { BaseEntity } from 'src/common/utils/base.entity';

@Entity()
export class Restaurant extends BaseEntity {
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

  @ManyToMany(() => Products)
  @JoinTable()
  menu: Products[];
}
