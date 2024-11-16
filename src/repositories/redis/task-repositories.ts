import { FastifyInstance } from "fastify";
import type { Task } from "@/models/task.js";

export class TaskRepository {
  constructor(private readonly fastify: FastifyInstance) {}

  async create(task: Task, authorId: string) {
    if (!task.uuid) {
      throw new Error("Task UUID is required");
    }

    const taskWithAuthor = { ...task, authorId, status: 1 };

    await this.fastify.redis.hset(
      "tasks",
      task.uuid,
      JSON.stringify(taskWithAuthor)
    );
    return taskWithAuthor;
  }

  async list(): Promise<Task[]> {
    const tasks = await this.fastify.redis.hgetall("tasks");
    return Object.values(tasks).map((task) => JSON.parse(task));
  }

  async get(uuid: string): Promise<Task | null> {
    const task = await this.fastify.redis.hget("tasks", uuid);
    return task ? JSON.parse(task) : null;
  }

  async update(
    uuid: string,
    taskData: Partial<Task>,
    authorId: string
  ): Promise<Task | null> {
    const existingTask = await this.fastify.redis.hget("tasks", uuid);
    if (!existingTask) return null;

    const task: Task = JSON.parse(existingTask);

    if (task.authorId !== authorId) {
      throw new Error("You are not authorized to update this task");
    }

    const updatedTask: Task = {
      ...task,
      ...taskData,
      title: taskData.title || task.title,
      description: taskData.description || task.description,
      updated_at: new Date().toISOString(),
      status: taskData.status ?? task.status,
    };

    await this.fastify.redis.hset("tasks", uuid, JSON.stringify(updatedTask));
    return updatedTask;
  }

  async delete(uuid: string, authorId: string): Promise<boolean> {
    const existingTask = await this.fastify.redis.hget("tasks", uuid);
    if (!existingTask) return false;

    const task: Task = JSON.parse(existingTask);

    if (task.authorId !== authorId) {
      throw new Error("You are not authorized to delete this task");
    }

    const result = await this.fastify.redis.hdel("tasks", uuid);
    return result > 0;
  }
}
