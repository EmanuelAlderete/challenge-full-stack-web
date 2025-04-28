export class ResponseStudentDto {
  id: number;
  name: string;
  email: string;
  ra: string;
  cpf: string;

  constructor(
    id: number,
    name: string,
    email: string,
    ra: string,
    cpf: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.ra = ra;
    this.cpf = cpf;
  }
}
