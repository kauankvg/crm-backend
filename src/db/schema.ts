import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  cpfCnpj: varchar('cpfCnpj', { length: 18 }).unique().notNull(),
  email: varchar('email', { length: 255 }),
  telefone: varchar('telefone', { length: 20 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});
