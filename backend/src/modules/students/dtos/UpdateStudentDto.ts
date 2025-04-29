import { z } from "zod";

export const UpdateStudentSchema = z.object({
  name: z.string().min(2, "Preencha com um nome válido").optional(),
  email: z.string().email("Informe um endereço de email válido").optional(),
});

export type UpdateStudentDto = z.infer<typeof UpdateStudentSchema>;
