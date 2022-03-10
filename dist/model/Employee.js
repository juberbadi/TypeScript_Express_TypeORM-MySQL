"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Employee = class Employee extends typeorm_1.BaseEntity {
    id;
    name;
    email;
    position;
    office;
    salary;
    // @OneToOne(() => User)
    // @JoinColumn()
    // user: User;
    // @ManyToOne(() => User, user=>user.employees)
    // @JoinColumn()
    // user: User;
    users;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "office", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Employee.prototype, "users", void 0);
Employee = __decorate([
    (0, typeorm_1.Entity)()
], Employee);
exports.Employee = Employee;
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
