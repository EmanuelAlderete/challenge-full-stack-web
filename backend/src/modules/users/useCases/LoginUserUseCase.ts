import { ValidationError } from "../../../shared/errors/ValidationError";
import { RequestUserDto } from "../dtos/RequestUserDto";
import { IUserRepository } from "../repositories/user.repository.interface";
import { env } from 'node:process';
import * as bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RequestUserDto) {
    const user = await this.userRepository.findUnique({
        email: data.email,
    });
    
    if(!user) {
        throw new ValidationError("As credenciais estão incorretas");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new ValidationError("As credenciais estão incorretas");
    }

    const token = jwt.sign({id: user.id, email: user.email}, String(env.JWT_SECRET), { expiresIn: '1h' } as SignOptions);

    return token;
  }
}
