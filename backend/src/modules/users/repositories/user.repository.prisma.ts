import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { IUserRepository } from "./user.repository.interface";
import { RequestUserDto } from "../dtos/RequestUserDto";
import * as bcrypt from "bcryptjs";
import logger from "../../../shared/config/winston.config";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements IUserRepository {
  async create({ name, email, password }: RequestUserDto) {
    try {
      logger.info(`Inicializing creation process. [EMAIL: ${email}]`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      logger.info(`Creation process concluded. [EMAIL: ${newUser.email}]`);
      return newUser;
    } catch (error: any) {
      logger.error(
        `Error on USER REPOSITORY during creation process: ${error.message}`,
        { dbError: error }
      );
    }
  }
}
