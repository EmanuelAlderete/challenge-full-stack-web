import { Request, Response } from "express";
import { RequestUserDTO } from "../dtos/RequestUserDto";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { UserRepositoryPrisma } from "../repositories/UserRepositoryPrisma";

const userRepository = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepository);

export class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    console.log("opa");
    try {
      const { name, email, password } = req.body;
      const requestUserDto = new RequestUserDTO(name, email, password);
      const user = await createUserUseCase.execute(requestUserDto);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error });
    }
  };
}
