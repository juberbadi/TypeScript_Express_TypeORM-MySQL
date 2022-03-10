import { Entity,Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { User } from './User';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  position: string;

  @Column()
  office: string;

  @Column()
  salary: string;

  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  // @ManyToOne(() => User, user=>user.employees)
  // @JoinColumn()
  // user: User;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}

//one to many and many to one relationship
// const employee = new Employee();
// employee.name = 'Test';
// await entityManager.save(employee);
//
// const p1 = new Photo();
// p1.url = 'demo1.jpg';
// p1.employee = employee;
// await entityManager.save(p1);
//
// const p2 = new Photo();
// p2.url = 'demo2.jpg';
// p2.employee = employee;
// await entityManager.save(p2);
//
// const employee = new Employee();
// employee.name = 'Test2';
// employee.photos = [p1,p2];
// await entityManager.save(employee);


//many to many
// const c1 = new Categgery();
// c1.name = 'A';
// await entityManager.save(c1);
//
// const c2 = new Categgery();
// c2.name = "B";
// await entityManager.save(c2);
//
// const c3 = new Categgery();
// c3.name = "C";
// await entityManager.save(c3);
//
// const q1 = new Question()
// q1.text = "Last Test";
// q2.title = "Last Test";
// q1.categories = [c1, c2, c3];
// await entityManager.save(q1);
