import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { RequestUserDto } from "../dtos/ResquestUserDto";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  async create({ name, email, password }: RequestUserDto) {
    password = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
