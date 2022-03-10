import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { Employee } from "../model/Employee";

export const createEmployeeData: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;

  interface JwtPayload {
    userId: string
  }
  const token = req.cookies.jwt;
  const {userId} = jwt.verify(token, "codingwithjbr") as JwtPayload;
  // const data = JSON.stringify(decoded);
  console.log(userId);

  try {
    const entityManager = getManager();
    let data = await entityManager.findOne(Employee, { where: { email } });
    if (data) return next(createHttpError(406, "employee already exists"));
    let record = await entityManager.insert(Employee, { ...req.body, user:userId });
    res.status(201).json({message: 'User successfully created', name, email, position, office, salary,});
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployees: RequestHandler = async (req, res, next) => {
  try {
    const entityManager = getManager();
    let employee = await entityManager.find(Employee);
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const entityManager = getManager();
    let employee = await entityManager.findOne(Employee, { where: { id } });
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const entityManager = getManager();
    let employee =  await entityManager.delete(Employee,id)
    if (employee.affected == 0) return next(createHttpError(406, "employee not found"));
    res.status(201).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const updateEmployee: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;
  const id: string = req.params.id;
  try {
    const entityManager = getManager();
    let record = await entityManager.findOne(Employee, { where: { id } });
		if (!record) {
			return res.json({ msg: "Can not find existing record" });
		}
    let employee = await entityManager.update(Employee, id, { ...req.body });
    res.status(201).json({ message: 'Updated Successfully'});
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
