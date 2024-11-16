import { FastifyRequest, FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/models/task";
import type { TaskRepository } from "@/@types/task-repository";
import { taskSchema } from "@/schemas/task-schemas";

interface Params {
  uuid: string;
}

export class TaskController {
  constructor(private readonly taskService: TaskRepository) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = taskSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send(parseResult.error.format());
    }

    const taskData = parseResult.data;
    const authorId = this.getAuthorId(request);

    if (!authorId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const task: Task = {
      uuid: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      created_at: new Date().toISOString(),
      authorId,
    };

    try {
      const newTask = await this.taskService.create(task, authorId);
      reply.status(201).send(newTask);
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks: Task[] = await this.taskService.list();
      reply.send(tasks);
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  async get(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    const { uuid } = request.params;
    try {
      const task: Task | null | undefined = await this.taskService.get(uuid);
      if (task) {
        reply.send(task);
      } else {
        reply.status(404).send({ message: "Task não encontrada" });
      }
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  async update(
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    const { uuid } = request.params;
    const parseResult = taskSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send(parseResult.error.format());
    }

    const taskData = parseResult.data;

    const authorId = this.getAuthorId(request);
    if (!authorId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    try {
      const existingTask = await this.taskService.get(uuid);
      if (!existingTask) {
        return reply.status(404).send({ message: "Task não encontrada" });
      }

      if (existingTask.authorId !== authorId) {
        return reply
          .status(403)
          .send({ message: "Forbidden: You are not the author of this task" });
      }

      const updatedTask = { ...existingTask, ...taskData };
      await this.taskService.update(uuid, updatedTask, authorId);
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  async delete(
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    const { uuid } = request.params;
    try {
      const authorId = this.getAuthorId(request);
      if (!authorId) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const task = await this.taskService.get(uuid);
      if (!task) {
        return reply.status(404).send({ message: "Task não encontrada" });
      }

      if (task.authorId !== authorId) {
        return reply
          .status(403)
          .send({ message: "Forbidden: You are not the author of this task" });
      }

      const deleted = await this.taskService.delete(uuid, authorId);
      if (deleted) {
        reply.send({ message: "Task excluída com sucesso" });
      } else {
        reply.status(404).send({ message: "Task não encontrada" });
      }
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  private getAuthorId(request: FastifyRequest): string | undefined {
    const user = request.user as { sub: string } | undefined;
    if (user && user.sub) {
      return user.sub;
    }
    return undefined;
  }
}
