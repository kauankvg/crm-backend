import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 18, { message: 'O CPF/CNPJ deve ter entre 11 e 18 caracteres' })
  cpfCnpj: string;

  @IsEmail({}, { message: 'O email fornecido é inválido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;
}
