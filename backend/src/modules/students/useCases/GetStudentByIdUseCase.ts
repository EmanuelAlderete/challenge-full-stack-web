import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class GetStudentByIdUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number) {
    const student = await this.studentRespository.getById(id);
    if (!student) {
      throw new NotFoundError(`Estudante com id ${id} não encontrado`);
    }
    return student;
  }
}
