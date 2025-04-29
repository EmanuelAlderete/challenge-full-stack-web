import { z } from "zod";

export const CreateStudentSchema = z.object({
  name: z
    .string({
      message: "O campo 'nome' é obrigatório.",
    })
    .min(2, "Preencha com um nome válido"),
  email: z
    .string({
      message: "O campo 'email' é obrigatório.",
    })
    .email("E-mail é necessário"),
  ra: z
    .string({
      message: "O campo 'RA' é obrigatório.",
    })
    .min(1, "Informe o número do RA"),
  cpf: z
    .string({
      message: "O campo 'CPF' é obrigatório.",
    })
    .min(11, "Informe o CPF válido!"),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;
