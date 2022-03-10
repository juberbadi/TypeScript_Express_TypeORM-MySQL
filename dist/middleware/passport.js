"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  UserSchema  from '../model/User';
// const UserSchema = require("../model/User").UserSchema;
const User_1 = require("../model/User");
const index_js_1 = require("../config/index.js");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const { Strategy } = passport_jwt_1.default;
const typeorm_1 = require("typeorm");
const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies?.jwt;
    }
    return jwt;
};
const optionsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: index_js_1.JWT_KEY,
};
exports.default = (passport) => {
    passport.use(new Strategy(optionsCookie, async (payload, done) => {
        const entityManager = (0, typeorm_1.getManager)();
        await entityManager.find(User_1.User, payload.userId)
            // await UserSchema.findByPk(payload.userId)
            .then((user) => {
            user ? done(null, user) : done(null, false);
        })
            .catch(() => done(null, false));
    }));
};
// const optionsJwt = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET,
// };
// export default (passport: PassportStatic) => {
//   passport.use(
//     new Strategy(optionsJwt, async (payload, done) => {
//       await User.findById(payload.uid)
//         .then((user) => {
//           user ? done(null, user) : done(null, false);
//         })
//         .catch(() => done(null, false));
//     })
//   );
// };
// for http only cookie system
