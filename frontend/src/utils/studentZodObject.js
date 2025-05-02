import { toTypedSchema } from "@vee-validate/zod";
import { cpfValidator } from "./cpfValidator";
import z from "zod";

export const studentSchema = toTypedSchema(
  z.object({
    name: z
      .string({ message: "Obrigatório" })
      .min(2, { message: "Informe um nome válido." }),
    email: z
      .string({ message: "Obrigatório" })
      .min(4, { message: "Campo obrigatório." })
      .email({ message: "Digite um email válido." }),
    ra: z
      .string({ message: "Obrigatório" })
      .min(1, { message: "Digite um RA válido" }),
    cpf: z
      .string()
      .min(14, {
        message: "CPF deve ter 14 caracteres (formato ###.###.###-##).",
      })
      .max(14, {
        message: "CPF deve ter 14 caracteres (formato ###.###.###-##).",
      })
      .refine(cpfValidator, { message: "CPF inválido." }),
  })
);
