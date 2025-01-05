import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener 8 caracteres" }),
});
