import { RequestUserDto } from "../dtos/RequestUserDto";

export interface IUserRepository {
  create(data: RequestUserDto): Promise<any>;
  // getById(id: number): Promise<any>;
  // update(id: number, data: Partial<RequestUserDto>): Promise<any>;
  // delete(id: number): Promise<any>;
  findUnique(where: { id?: number; email?: string }): Promise<any>;
  getById(id: number): Promise<any>;
  findMany(data: object): Promise<any>;
}
