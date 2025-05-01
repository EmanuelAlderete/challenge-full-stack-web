import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IUserRepository } from "./user.repository.interface";
import { RequestUserDto } from "../dtos/RequestUserDto";
import * as bcrypt from "bcryptjs";
import logger from "../../../shared/config/winston.config";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  getById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async create({ name, email, password }: RequestUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
  async findUnique(where: { id?: number; email?: string }): Promise<any> {
    if (!where.id && !where.email) {
      throw new Error("Either 'id' or 'email' must be provided.");
    }
    return await prisma.user.findUnique({
      where: where as { id: number } | { email: string },
    });
  }

  async findMany(data: object): Promise<any> {
    return await prisma.user.findMany(data);
  }
}
