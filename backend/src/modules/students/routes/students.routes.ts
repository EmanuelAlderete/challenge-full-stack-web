import { Router } from "express";
import { StudentsController } from "../controllers/students.cotroller";
import { validate } from "../../../shared/infra/http/middlewares/validate.middleware";
import { CreateStudentSchema } from "../dtos/CreateStudentDto";

const router = Router();

const studentController = new StudentsController();

router.post("/", validate(CreateStudentSchema), studentController.create);
router.get("/", studentController.index);
router.put("/:id", studentController.update);

export default router;
