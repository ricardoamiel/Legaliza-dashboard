import { z } from "zod";

export const UpdateDataSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  roles: z.enum(["ADMINISTRADOR", "ASISTENTE_VEHICULAR", "ASISTENTE_NOTARIAL", "CLIENTE"]),
});

