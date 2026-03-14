import { Injectable, Inject } from '@nestjs/common';
import { DrizzleProvider } from '../db/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import { CreateClienteDto } from './dto/create-cliente.dto';

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
}
