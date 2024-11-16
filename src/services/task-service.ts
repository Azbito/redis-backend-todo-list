import type { Task } from "@/models/task.js";
import type { TaskRepository } from "@/repositories/redis/task-repositories.js";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(task: Task, authorId: string): Promise<Task> {
    try {
      return await this.taskRepository.create(task, authorId);
    } catch (error: any) {
      throw new Error("Erro ao criar a task: " + error.message);
    }
  }

  async list(): Promise<Task[]> {
    try {
      return await this.taskRepository.list();
    } catch (error: any) {
      throw new Error("Erro ao listar as tasks: " + error.message);
    }
  }

  async get(uuid: string): Promise<Task | null> {
    try {
      return await this.taskRepository.get(uuid);
    } catch (error: any) {
      throw new Error("Erro ao obter a task: " + error.message);
    }
  }

  async update(
    uuid: string,
    updatedTask: Task,
    authorId: string
  ): Promise<void> {
    try {
      await this.taskRepository.update(uuid, updatedTask, authorId);
    } catch (error: any) {
      throw new Error("Erro ao atualizar a task: " + error.message);
    }
  }

  async delete(uuid: string, authorId: string): Promise<boolean> {
    try {
      return await this.taskRepository.delete(uuid, authorId);
    } catch (error: any) {
      throw new Error("Erro ao excluir a task: " + error.message);
    }
  }
}
