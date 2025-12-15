import { Injectable } from '@nestjs/common';
// importa o decorator Injectable, que permite que este service
// seja injetado em outros arquivos (ex: controller)

import { Task } from './entities/task.entity';
// importa o tipo da task no entities, só pra melhor organização

@Injectable()
export class TasksService {

  private tasks: Task[] = [];
  // array que armazena todas as tasks
  // por enquanto os dados ficam apenas em memória

  private idCounter = 1;
  // contador simples usado para gerar ids únicos para cada task criada

  findAll() {
    // retorna todas as tasks cadastradas no sistema
    return this.tasks;
  }

  findOne(id: number) {
    // busca uma task específica pelo id
    // percorre o array e retorna a primeira task com id igual ao informado
    return this.tasks.find(task => task.id === id);
  }

  markAsDone(id: number) {
    // marca uma task como concluída (done = true)

    const task = this.tasks.find(task => task.id === id);
    // procura a task pelo id

    if (!task) {
      // se a task não existir, retorna null
      return null;
    }

    task.done = true;
    // altera o status da task para concluída

    return task;
    // retorna a task atualizada
  }

  remove(id: number) {
    // remove uma task do sistema pelo id

    const index = this.tasks.findIndex(task => task.id === id);
    // encontra o índice da task no array

    if (index === -1) {
      // se não encontrar a task, retorna null
      return null;
    }

    const removedTask = this.tasks[index];
    // guarda a task que será removida

    this.tasks.splice(index, 1);
    // remove a task do array

    return removedTask;
    // retorna a task removida
  }

  update(
    id: number,
    data: { title?: string; description?: string; done?: boolean },
  ) {
    // atualiza os dados de uma task existente

    const task = this.tasks.find(task => task.id === id);
    // busca a task pelo id

    if (!task) {
      // se a task não existir, retorna null
      return null;
    }

    if (data.title !== undefined) {
      // atualiza o título somente se ele foi enviado
      task.title = data.title;
    }

    if (data.description !== undefined) {
      // atualiza a descrição somente se ela foi enviada
      task.description = data.description;
    }

    if (data.done !== undefined) {
      // atualiza o status da task somente se ele foi enviado
      task.done = data.done;
    }

    return task;
    // retorna a task atualizada
  }

  create(data: { title: string; description?: string }) {
    // cria uma nova task a partir dos dados recebidos no body da requisição

    const newTask: Task = {
      id: this.idCounter++,
      // define o id da task e incrementa o contador

      title: data.title,
      // título recebido no body

      description: data.description ?? null,
      // se a descrição existir, usa ela, senão define como null

      done: false,
      // define a task como não concluída por padrão

      createdAt: new Date(),
      // salva a data e hora em que a task foi criada
    };

    this.tasks.push(newTask);
    // adiciona a nova task no array de tasks

    return newTask;
    // retorna a task criada
  }
}