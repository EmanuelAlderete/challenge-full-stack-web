import { RequestStudentDto } from "../dtos/RequestStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class CreateStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(data: RequestStudentDto) {
    const student = await this.studentRespository.create(data);
    return student;
  }
}
