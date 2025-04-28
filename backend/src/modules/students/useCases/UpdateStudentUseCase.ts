import { RequestStudentDto } from "../dtos/RequestStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class UpdateStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number, data: RequestStudentDto) {
    const student = await this.studentRespository.update(id, data);
    return student;
  }
}
