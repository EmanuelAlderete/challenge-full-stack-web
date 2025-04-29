import { ValidationError } from "../../../shared/errors/ValidationError";
import { CreateStudentDto } from "../dtos/CreateStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(data: CreateStudentDto) {
    const students = await this.studentRepository.findMany({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            cpf: data.cpf,
          },
          {
            ra: data.ra,
          },
        ],
      },
    });
    if (students.length > 0) {
      throw new ValidationError("Email, CPF ou RA já cadastrado");
    }
    const student = await this.studentRepository.create(data);
    return student;
  }
}
