import { ResponseStudentDto } from "../dtos/ResponseStudentDto";
import { IStudentRepository } from "../repositories/student.repository.interface";

export class ListStudentsUseCase {
  constructor(private studentRespository: IStudentRepository) {}

  async execute() {
    const studentsList = await this.studentRespository.all();

    const response: ResponseStudentDto[] = studentsList.map(
      (student: ResponseStudentDto) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        ra: student.ra,
        cpf: student.cpf,
      })
    );

    return response;
  }
}
