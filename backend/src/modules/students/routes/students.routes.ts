import { Router } from "express";
import { StudentsController } from "../controllers/students.cotroller";
import { validate } from "../../../shared/infra/http/middlewares/validate.middleware";
import { CreateStudentSchema } from "../dtos/CreateStudentDto";
import { UpdateStudentSchema } from "../dtos/UpdateStudentDto";

const router = Router();

const studentController = new StudentsController();

router.post("/", validate(CreateStudentSchema), studentController.create);
router.get("/", studentController.index);
router.put("/:id", validate(UpdateStudentSchema), studentController.update);

export default router;
