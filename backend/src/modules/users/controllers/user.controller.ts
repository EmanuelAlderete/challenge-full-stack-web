import { Request, Response } from "express";
import { RequestUserDto } from "../dtos/RequestUserDto";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { LoginUserUseCase } from "../useCases/LoginUserUseCase";
import { UserRepositoryPrisma } from "../repositories/user.repository.prisma";
import logger from "../../../shared/config/winston.config";

const userRepository = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const requestUserDto = new RequestUserDto(name, email, password);
    const user = await createUserUseCase.execute(requestUserDto);
    res.location(`/users/${user.id}`).status(201).json(user);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const token = await loginUserUseCase.execute(req.body)

    res.status(200).json(token);
  }
}
