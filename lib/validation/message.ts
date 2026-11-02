import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Format email tidak valid."),
  subject: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter."),
});

export type MessageInput = z.infer<typeof messageSchema>;
