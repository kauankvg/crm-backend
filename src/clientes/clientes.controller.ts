import { Controller, Post, Get, Body } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

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
}
