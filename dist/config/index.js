"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.FRONTEND_URL = exports.JWT_KEY = exports.PORT = exports.DB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const typeorm_1 = require("typeorm");
const Example_1 = require("../model/Example");
const Employee_1 = require("../model/Employee");
const User_1 = require("../model/User");
(0, typeorm_1.createConnection)({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "authdb",
    synchronize: true,
    // entities: ['./model/*.ts'],
    entities: [Example_1.Example, Employee_1.Employee, User_1.User],
    logging: true,
})
    .then(() => {
    console.log("DB Connected");
})
    .catch((e) => {
    console.log("Error: " + e);
});
dotenv_1.default.config();
exports.DB = process.env.DB;
exports.PORT = parseInt(process.env.PORT);
exports.JWT_KEY = process.env.JWT_KEY;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();
let testAccount = {
    user: "ayajnwfyghendnff@ethereal.email",
    pass: "mCT5eXxfJ7UHy5fvcf",
};
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass, // generated ethereal password
    },
});
