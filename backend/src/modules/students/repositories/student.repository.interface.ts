import { RequestStudentDto } from "../dtos/RequestStudentDto";

export interface IStudentRepository {
  create(data: RequestStudentDto): Promise<any>;
  all(): Promise<any>;
  // getById(id: number): Promise<any>;
  // update(id: number, data: Partial<RequestUserDto>): Promise<any>;
  // delete(id: number): Promise<any>;
}
