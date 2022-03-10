import { Entity,Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Example extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
