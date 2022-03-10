"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExample = void 0;
// const ExampleSchema = require("../model/Example").ExampleSchema;
const Example_1 = require("../model/Example");
const typeorm_1 = require("typeorm");
const getExample = async (req, res, next) => {
    try {
        // const records = await ExampleSchema.findAll({});
        const entityManager = (0, typeorm_1.getManager)();
        let data = await entityManager.insert(Example_1.Example, {
            name: "juber",
            email: "juber@gmail.com",
            phone: "8181810000"
        });
        //update data
        // let data = await entityManager.update(Example,2,{email: "juber@gmail.com"})
        //delete data
        //let data =  await entityManager.delete(Example,2)
        //find all data
        // let data = await entityManager.find(Example);
        //find id data
        // let data = await entityManager.findOne(Example,1);
        res.json({ data: data });
        console.log(data);
    }
    catch (e) {
        return res.json({ msg: "fail to read", status: 500 });
    }
};
exports.getExample = getExample;
// export const getExampleData: RequestHandler = async (req, res, next) => {
//
//   const { name, id }: IExampleData = req.body;
//
//   try {
//     const example = await ExampleSchema.findOne({ where: {name} });
//
//     if (example) return next(createHttpError(406, "example already exists"));
//
//     // const newExample = new Example({ name, id });
//     const record = await ExampleSchema.create({ ...req.body });
//
//     res.status(200).json({ name, id });
//   } catch (error) {
//     return next(createHttpError.InternalServerError);
//   }
// };
