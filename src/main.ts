import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//função assincrona que retorna uma promise, aqui ele aguarda pra ver se esstá tudo certo para iniciar o sistema na porta 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
