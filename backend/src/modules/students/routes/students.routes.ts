import { Request, Response, Router } from "express";
import { StudentsController } from "../controllers/students.cotroller";

const router = Router();

const studentController = new StudentsController();

router.post("/", studentController.create);
router.get("/", studentController.index);
router.put("/:id", studentController.update);

export default router;
