import { IStudentRepository } from "../repositories/student.repository.interface";

export class ListStudentsUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute() {
    const students = await this.studentRespository.all();
    return students;
  }
}
