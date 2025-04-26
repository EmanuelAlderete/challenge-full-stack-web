import { Request, Response } from "express";
import { RequestUserDto } from "../dtos/RequestUserDto";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { UserRepositoryPrisma } from "../repositories/UserRepositoryPrisma";
import { Logger } from "winston";

const userRepository = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepository);

export class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const requestUserDto = new RequestUserDto(name, email, password);
      const user = await createUserUseCase.execute(requestUserDto);
      res.location(`/users/${user.id}`).status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error });
    }
  };
}
