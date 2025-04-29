import { IStudentRepository } from "../repositories/student.repository.interface";

export class ListStudentsUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute() {
    return await this.studentRespository.all();
  }
}
