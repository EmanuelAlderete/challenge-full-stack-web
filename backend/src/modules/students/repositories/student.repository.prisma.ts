import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IStudentRepository } from "./student.repository.interface";
import logger from "../../../shared/config/winston.config";
import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";

const prisma = new PrismaClient();

export class StudentRepositoryPrisma implements IStudentRepository {
  async create({ name, email, ra, cpf }: CreateStudentDto) {
    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          email,
          ra,
          cpf,
        },
      });
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
      const studentsList = await prisma.student.findMany();
      return studentsList;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during retrieving all data process: ${error.message}`
      );
    }
  }

  async update(id: number, { name, email }: UpdateStudentDto) {
    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
      },
    });
    return student;
  }

  async delete(id: number) {
    try {
      const deleteStudent = await prisma.student.delete({
        where: {
          id: id,
        },
      });
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
      const student = await prisma.student.findUnique({
        where: {
          id: id,
        },
      });
      return student;
    } catch (error: any) {
      logger.error(
        `Error on STUDENT REPOSITORY during searching process: ${error.message}`,
        { dbError: error }
      );
    }
  }
}
