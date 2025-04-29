import { RequestStudentDto } from "../dtos/RequestStudentDto";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class UpdateStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number, data: UpdateStudentDto) {
    const student = await this.studentRespository.update(id, data);
    return student;
  }
}
