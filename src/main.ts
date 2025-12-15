import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Função assíncrona responsável por iniciar a aplicação NestJS
// Ela cria a aplicação a partir do AppModule e só continua quando tudo estiver carregado
async function bootstrap() {
  // Cria a aplicação Nest usando o módulo principal
  const app = await NestFactory.create(AppModule);

  // Inicia o servidor HTTP na porta definida pelo ambiente (.env),
  // ou usa a porta 3000 como padrão
  await app.listen(process.env.PORT ?? 3000);
}

// Chamada da função que inicia toda a aplicação
bootstrap();
