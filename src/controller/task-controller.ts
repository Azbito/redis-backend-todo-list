import { FastifyRequest, FastifyReply } from "fastify";
import { taskService } from "../services/task-service";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/@types/task";

interface Params {
  uuid: string;
}

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const taskController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = taskSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send(parseResult.error.format());
    }

    const taskData = parseResult.data;

    const task: Task = {
      uuid: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      created_at: new Date().toISOString(),
    };

    try {
      const newTask = await taskService.create(task);
      reply.status(201).send(newTask);
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks: Task[] = await taskService.list();
      reply.send(tasks);
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },

  async get(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    const { uuid } = request.params;
    try {
      const task: Task | null | undefined = await taskService.get(uuid);
      if (task) {
        reply.send(task);
      } else {
        reply.status(404).send({ message: "Task não encontrada" });
      }
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },

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

    const task: Task = {
      title: taskData.title,
      description: taskData.description,
      created_at: new Date().toISOString(), 
    };

    try {
      const updatedTask = await taskService.update(uuid, task);
      if (updatedTask) {
        reply.send(updatedTask);
      } else {
        reply.status(404).send({ message: "Task não encontrada" });
      }
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },

  async delete(
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    const { uuid } = request.params;
    try {
      const deleted = await taskService.delete(uuid);
      if (deleted) {
        reply.send({ message: "Task excluída com sucesso" });
      } else {
        reply.status(404).send({ message: "Task não encontrada" });
      }
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },
};
