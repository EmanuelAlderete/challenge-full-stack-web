import { RequestUserDto } from "../dtos/ResquestUserDto";
import { IUserRepository } from "../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RequestUserDto) {
    const user = await this.userRepository.create(data);
    return user;
  }
}
