import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IUserRepository } from "./IUserRepository";
import { RequestUserDto } from "../dtos/RequestUserDto";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  async create({ name, email, password }: RequestUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error("Erro Prisma:", JSON.stringify(error, null, 2));
      throw new Error("Failed to create user");
    }
  }
}
