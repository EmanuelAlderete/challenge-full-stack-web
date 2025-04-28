import { Request, Response } from "express";
import logger from "../../../shared/config/winston.config";
import { StudentRepositoryPrisma } from "../repositories/student.repository.prisma";
import { CreateStudentUseCase } from "../useCases/CreateStudentUseCase";
import { RequestStudentDto } from "../dtos/RequestStudentDto";
import { ListStudentsUseCase } from "../useCases/ListStudentsUseCase";
import { UpdateStudentUseCase } from "../useCases/UpdateStudentUseCase";
import { DeleteStudentUseCase } from "../useCases/DeleteStudentUseCase";

const studentRepository = new StudentRepositoryPrisma();
const createStudentUseCase = new CreateStudentUseCase(studentRepository);
const listStudentsUseCase = new ListStudentsUseCase(studentRepository);
const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

export class StudentsController {
  create = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to create student.`, { body: req.body });
    try {
      const studentDto: CreateStudentDto = req.body;
      const student = await createStudentUseCase.execute(studentDto);
      logger.info(`Student created successfully: [Student ID: ${student.id}]`);
      res.location(`/students/${student.id}`).status(201).json(student);
    } catch (error: any) {
      logger.error(`Error during student creation process: ${error.message}`, {
        error,
      });
      res.status(500).json({ message: "Failed to create student" });
    }
  };

  index = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to list all students.`);
    try {
      const studensList = await listStudentsUseCase.execute();
      res.status(200).json(studensList);
    } catch (error: any) {
      logger.error(`Error during retrieving students list: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to update student.`, { body: req.body });
    try {
      const { id } = req.params;
      const studentDto: CreateStudentDto = req.body;
      const student = await updateStudentUseCase.execute(
        Number(id),
        studentDto
      );
      logger.info(`Student updated successfully: [Student ID: ${student.id}]`);
      res.location(`/students/${student.id}`).status(200).json(student);
    } catch (error: any) {
      logger.error(`Error during student creation process: ${error.message}`, {
        error,
      });
      res.status(500).json({ message: "Failed to update student" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to delete student, [ID - ${req.params.id}]`);
    try {
      const { id } = req.params;
      await deleteStudentUseCase.execute(Number(id));
      logger.info(`Student delete successfully!`);
      res
        .status(200)
        .json({ status: "sucess", message: "Student deleted successfully!" });
    } catch (error: any) {
      logger.error(`Error during student deleting process: ${error.message}`, {
        error,
      });
      res.status(500).json({ message: "Failed to delete student" });
    }
  };
}
