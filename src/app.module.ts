// Importações necessárias para definir o módulo principal da aplicação
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module'; //Importa o task criado no src

// Decorator que define este arquivo como um módulo do NestJS
@Module({
  // Módulos que o AppModule utiliza
  imports: [TasksModule],

  // Controllers ligados diretamente ao AppModule
  controllers: [AppController],

  // Services disponíveis para injeção de dependência
  providers: [AppService],
})
export class AppModule {}
