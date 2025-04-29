import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IStudentRepository } from "./student.repository.interface";
import logger from "../../../shared/config/winston.config";
import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";

const prisma = new PrismaClient();

export class StudentRepositoryPrisma implements IStudentRepository {
  async create({ name, email, ra, cpf }: CreateStudentDto) {
    try {
      logger.info(`Inicializing creation process (1/2). [RA: ${ra}]`);
      const newStudent = await prisma.student.create({
        data: {
          name,
          email,
          ra,
          cpf,
        },
      });
      logger.info(`Creation process concluded (2/2). [RA: ${newStudent.ra}]`);
      return newStudent;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during creation process: ${error.message}`,
        { dbError: error }
      );
    }
  }

  async all() {
    try {
      logger.info(`Retrieving [STUDENTS LIST] from DB (1/2)`);
      const studentsList = await prisma.student.findMany();
      logger.info("All data retrieved successfully (2/2).");
      return studentsList;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during retrieving all data process: ${error.message}`
      );
    }
  }

  async update(id: number, { name, email }: UpdateStudentDto) {
    try {
      logger.info(`Inicializing updating process (1/2). [ID: ${id}]`);
      const student = await prisma.student.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
        },
      });
      logger.info(`Updating process concluded (2/2). [ID: ${student.id}]`);
      return student;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during updating process: ${error.message}`,
        { dbError: error }
      );
    }
  }

  async delete(id: number) {
    try {
      logger.info(`Inicializing deleting process (1/2). [ID: ${id}]`);
      const deleteStudent = await prisma.student.delete({
        where: {
          id: id,
        },
      });
      logger.info(
        `Deleting process concluded (2/2). [ID: ${deleteStudent.id}]`
      );
      return deleteStudent;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during updating process: ${error.message}`,
        { dbError: error }
      );
    }
  }

  async getById(id: number) {
    try {
      logger.info(`Inicializing searching process (1/2). [ID: ${id}]`);
      const student = await prisma.student.findUnique({
        where: {
          id: id,
        },
      });
      logger.info(`Searching process concluded (2/2). [ID: ${student?.id}]`);
      return student;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during searching process: ${error.message}`,
        { dbError: error }
      );
    }
  }
}
