import { Request, Response } from "express";
import { RequestUserDto } from "../dtos/RequestUserDto";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { UserRepositoryPrisma } from "../repositories/UserRepositoryPrisma";
import logger from "../../../shared/config/winston.config";

const userRepository = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepository);

export class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Received request to create user.`, { body: req.body });
    try {
      const { name, email, password } = req.body;
      const requestUserDto = new RequestUserDto(name, email, password);
      const user = await createUserUseCase.execute(requestUserDto);
      logger.info(`User created successfully: [USER ID: ${user.id}]`);
      res.location(`/users/${user.id}`).status(201).json(user);
    } catch (error: any) {
      logger.error(`Error during user creation process: ${error.message}`, {
        error,
      });
      res.status(500).json({ message: "Failed to create user" });
    }
  };
}
