import { Module, Global } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { DrizzleProvider } from './db.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: DrizzleProvider,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');

        if (!connectionString) {
          throw new Error('DATABASE_URL não definida no .env');
        }

        const client = postgres(connectionString);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DrizzleProvider],
})
export class DbModule {}
