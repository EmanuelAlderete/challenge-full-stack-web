import { RequestUserDto } from "../dtos/ResquestUserDto";

export interface IUserRepository {
  create(data: RequestUserDto): Promise<any>;
  getById(id: number): Promise<any>;
  update(id: number, data: Partial<RequestUserDto>): Promise<any>;
  delete(id: number): Promise<any>;
}
