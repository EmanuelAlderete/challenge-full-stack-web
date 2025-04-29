import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class CreateStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(data: CreateStudentDto) {
    const student = await this.studentRespository.create(data);
    return student;
  }
}
