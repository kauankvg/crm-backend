import { Injectable, Inject } from '@nestjs/common';
import { DrizzleProvider } from '../db/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject(DrizzleProvider)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async criar(dados: CreateClienteDto) {
    const [novoCliente] = await this.db
      .insert(schema.clientes)
      .values(dados)
      .returning();

    return novoCliente;
  }

  async listarTodos() {
    return await this.db.query.clientes.findMany();
  }

  async listaPorId(id: number) {
    const cliente = await this.db.query.clientes.findFirst({
      where: eq(schema.clientes.id, id),
    });

    return cliente;
  }

  async atualizar(id: number, dados: UpdateClienteDto) {
    const resultado = await this.db
      .update(schema.clientes)
      .set(dados)
      .where(eq(schema.clientes.id, id))
      .returning();

    return resultado[0];
  }

  async remover(id: number) {
    return await this.db
      .delete(schema.clientes)
      .where(eq(schema.clientes.id, id))
      .returning();
  }
}
