import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IStudentRepository } from "./student.repository.interface";
import logger from "../../../shared/config/winston.config";
import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";

const prisma = new PrismaClient();

export class StudentRepositoryPrisma implements IStudentRepository {
  async create({ name, email, ra, cpf }: CreateStudentDto) {
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        ra,
        cpf,
      },
    });
    return newStudent;
  }

  async all() {
    return await prisma.student.findMany();
  }

  async update(id: number, { name, email }: UpdateStudentDto) {
    return await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
      },
    });
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
    return await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findMany(data: object): Promise<any> {
    return await prisma.student.findMany(data);
  }
}
