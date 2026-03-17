import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async cadastrar(@Body() dadosDoCliente: CreateClienteDto) {
    return await this.clientesService.criar(dadosDoCliente);
  }

  @Get()
  async listar() {
    return await this.clientesService.listarTodos();
  }

  @Get(':id')
  async listarPorId(@Param('id', ParseIntPipe) id: number) {
    const cliente = await this.clientesService.listaPorId(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente com o ID ${id} não foi encontrado.`);
    }

    return cliente;
  }

  @Patch(':id')
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateClienteDto,
  ) {
    const clienteExistente = await this.clientesService.listaPorId(id);

    if (!clienteExistente) {
      throw new NotFoundException(
        `Não é possível atualizar: Cliente ${id} não encontrado.`,
      );
    }

    return await this.clientesService.atualizar(id, dados);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return await this.clientesService.remover(id);
  }
}
