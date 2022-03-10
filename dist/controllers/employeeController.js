"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.getEmployee = exports.getEmployees = exports.createEmployeeData = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const Employee_1 = require("../model/Employee");
const createEmployeeData = async (req, res, next) => {
    const { name, email, position, office, salary } = req.body;
    const token = req.cookies.jwt;
    const { userId } = jsonwebtoken_1.default.verify(token, "codingwithjbr");
    // const data = JSON.stringify(decoded);
    console.log(userId);
    try {
        const entityManager = (0, typeorm_1.getManager)();
        let data = await entityManager.findOne(Employee_1.Employee, { where: { email } });
        if (data)
            return next((0, http_errors_1.default)(406, "employee already exists"));
        let record = await entityManager.insert(Employee_1.Employee, { ...req.body, user: userId });
        res.status(201).json({ message: 'User successfully created', name, email, position, office, salary, });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.createEmployeeData = createEmployeeData;
const getEmployees = async (req, res, next) => {
    try {
        const entityManager = (0, typeorm_1.getManager)();
        let employee = await entityManager.find(Employee_1.Employee);
        res.status(200).json({ employee });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getEmployees = getEmployees;
const getEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const entityManager = (0, typeorm_1.getManager)();
        let employee = await entityManager.findOne(Employee_1.Employee, { where: { id } });
        res.status(200).json({ employee });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getEmployee = getEmployee;
const deleteEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const entityManager = (0, typeorm_1.getManager)();
        let employee = await entityManager.delete(Employee_1.Employee, id);
        if (employee.affected == 0)
            return next((0, http_errors_1.default)(406, "employee not found"));
        res.status(201).json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.deleteEmployee = deleteEmployee;
const updateEmployee = async (req, res, next) => {
    const { name, email, position, office, salary } = req.body;
    const id = req.params.id;
    try {
        const entityManager = (0, typeorm_1.getManager)();
        let record = await entityManager.findOne(Employee_1.Employee, { where: { id } });
        if (!record) {
            return res.json({ msg: "Can not find existing record" });
        }
        let employee = await entityManager.update(Employee_1.Employee, id, { ...req.body });
        res.status(201).json({ message: 'Updated Successfully' });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.updateEmployee = updateEmployee;
