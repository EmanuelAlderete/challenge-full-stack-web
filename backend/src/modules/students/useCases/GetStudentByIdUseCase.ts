import { IStudentRepository } from "../repositories/student.repository.interface";

export class GetStudentByIdUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number) {
    const student = await this.studentRespository.getById(id);
    return student;
  }
}
