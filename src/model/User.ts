import { Entity,Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany } from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('boolean',{default: false})
  isUserVerified: boolean = false;

  @Column({nullable: true})
  verifyToken: string;

  // @OneToMany(() => Employee, employee=>employee.user)
  // employees: Employee;

  @ManyToMany(() => Employee)
  employees: User;
}
