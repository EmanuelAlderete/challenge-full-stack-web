import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IStudentRepository } from "./student.repository.interface";
import { RequestStudentDto } from "../dtos/RequestStudentDto";
import logger from "../../../shared/config/winston.config";

const prisma = new PrismaClient();

export class StudentRepositoryPrisma implements IStudentRepository {
  async create({ name, email, ra, cpf }: RequestStudentDto) {
    try {
      logger.info(`Inicializing creation process. [RA: ${ra}]`);
      const newStudent = await prisma.student.create({
        data: {
          name,
          email,
          ra,
          cpf,
        },
      });
      logger.info(`Creation process concluded. [RA: ${newStudent.ra}]`);
      return newStudent;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during creation process: ${error.message}`,
        { dbError: error }
      );
    }
  }
}
