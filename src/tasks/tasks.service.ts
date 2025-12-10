//faz a lógica das requisições
import { Injectable } from '@nestjs/common';

//aqui é só um exemplo pq ainda não tem banco de dados
@Injectable()
export class TasksService {
  findAll() {
    return [
      { id: 1, title: "Estudar NestJS", done: false },
      { id: 2, title: "Criar API do TaskHub", done: true },
    ];
  }
}
