import { Router } from "express";
import { getExample,  } from "../controllers/exampleControllers";
import { getExampleDataValidation } from "../validation/exampleValidation/exampleValidation";
import { authChecker } from '../middleware/authChecker';

const router = Router();

router.post("/", getExample);
// router.post("/", authChecker, getExampleDataValidation, getExampleData);

export default router;
