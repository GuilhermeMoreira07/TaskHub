import {Controller,Get,Post,Body,Param,Put,NotFoundException,Delete} from '@nestjs/common';
// importa os decorators e exceções que serão usados para criar as rotas da API

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
//importa para melhor organização

import { TasksService } from './tasks.service';
// importa o service responsável pela lógica das tasks

@Controller('tasks')
// define que todas as rotas deste controller começam com /tasks
export class TasksController {  
  constructor(private readonly tasksService: TasksService) {}
  // injeção de dependência do TasksService
  // permite que o controller utilize os métodos do service

  @Get()
  // rota GET /tasks
  // usada para buscar todas as tasks cadastradas
  findAll() {
    return this.tasksService.findAll();
    // chama o service para retornar todas as tasks
  }

  @Get(':id')
  // rota GET /tasks/:id
  // usada para buscar uma task específica pelo id
  findOne(@Param('id') id: string) {
    const task = this.tasksService.findOne(Number(id));
    // converte o id recebido da URL para number e busca a task no service

    if (!task) {
      // se a task não existir, lança um erro 404
      throw new NotFoundException('Task não encontrada');
    }

    return task;
    // retorna a task encontrada
  }

  @Put(':id/done')
  // rota PUT /tasks/:id/done
  // usada para marcar uma task como concluída
  markAsDone(@Param('id') id: string) {
    const task = this.tasksService.markAsDone(Number(id));
    // chama o service para marcar a task como done = true

    if (!task) {
      // se a task não existir, retorna erro 404
      throw new NotFoundException('Task não encontrada');
    }

    return task;
    // retorna a task atualizada
  }

  @Delete(':id')
  // rota DELETE /tasks/:id
  // usada para remover uma task pelo id
  remove(@Param('id') id: string) {
    const task = this.tasksService.remove(Number(id));
    // chama o service para remover a task do array

    if (!task) {
      // se a task não existir, retorna erro 404
      throw new NotFoundException('Task não encontrada');
    }

    return task;
    // retorna a task removida
  }

  @Put(':id')
  // rota PUT /tasks/:id
  // usada para editar os dados de uma task existente
  update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto
  ) {
    const task = this.tasksService.update(Number(id), body);
    // chama o service para atualizar apenas os campos enviados no body

    if (!task) {
      // se a task não existir, retorna erro 404
      throw new NotFoundException('Task não encontrada');
    }

    return task;
    // retorna a task atualizada
  }

  @Post()
  // rota POST /tasks
  // usada para criar uma nova task
  create(@Body() body: CreateTaskDto) {
    // recebe os dados da task enviados no body da requisição

    return this.tasksService.create(body);
    // chama o service para criar e retornar a nova task
  }
}