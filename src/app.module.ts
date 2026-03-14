import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ClientesModule } from './clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule, ClientesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
