export class RequestStudentDto {
  name?: string;
  email?: string;
  ra?: string;
  cpf?: string;

  constructor(name?: string, email?: string, ra?: string, cpf?: string) {
    this.name = name;
    this.email = email;
    this.ra = ra;
    this.cpf = cpf;
  }
}
