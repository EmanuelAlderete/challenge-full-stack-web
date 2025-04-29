import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { UpdateStudentDto } from "../dtos/UpdateStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class UpdateStudentUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute(id: number, data: UpdateStudentDto) {
    const student = await this.studentRespository.getById(id);
    if (!student) {
      throw new NotFoundError(`Estudante com id ${id} não encontrado`);
    }
    await this.studentRespository.update(id, data);
    return student;
  }
}
