import { IStudentRepository } from "../repositories/student.repository.interface";

export class DeleteStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number) {
    const student = await this.studentRespository.delete(id);
    return student;
  }
}
