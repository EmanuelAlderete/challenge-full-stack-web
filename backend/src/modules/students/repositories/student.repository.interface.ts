import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";

export interface IStudentRepository {
  create(data: CreateStudentDto): Promise<any>;
  all(): Promise<any>;
  getById(id: number): Promise<any>;
  update(id: number, data: UpdateStudentDto): Promise<any>;
  delete(id: number): Promise<any>;
}
