import { BaseEntity } from 'src/common/utils/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;
}
