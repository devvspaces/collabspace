import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import z from "zod";

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.number().default(3306),
});

export const env = envSchema.parse(process.env);
