import { Request, Response } from "express";
import logger from "../../../shared/config/winston.config";
import { StudentRepositoryPrisma } from "../repositories/student.repository.prisma";
import { CreateStudentUseCase } from "../useCases/CreateStudentUseCase";
import { RequestStudentDto } from "../dtos/RequestStudentDto";
import { ListStudentsUseCase } from "../useCases/ListStudentsUseCase";

const studentRepository = new StudentRepositoryPrisma();
const createStudentUseCase = new CreateStudentUseCase(studentRepository);
const listStudentsUseCase = new ListStudentsUseCase(studentRepository);

export class StudentsController {
  create = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to create student.`, { body: req.body });
    try {
      const { name, email, ra, cpf } = req.body;
      const requestUserDto = new RequestStudentDto(name, email, ra, cpf);
      const student = await createStudentUseCase.execute(requestUserDto);
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
}
