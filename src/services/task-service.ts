import { v4 as uuidv4 } from "uuid";
import { taskRepository } from "@/repositories/task-repostories";
import type { Task } from "@/@types/task";

export const taskService = {
  async create(task: Task) {
    const taskWithUUID = { ...task, uuid: uuidv4() };
    await taskRepository.create(taskWithUUID);
    return taskWithUUID;
  },

  async list() {
    return taskRepository.list();
  },

  async get(uuid: string) {
    return taskRepository.get(uuid);
  },

  async update(uuid: string, task: Task) {
    return taskRepository.update(uuid, task);
  },

  async delete(uuid: string) {
    return taskRepository.delete(uuid);
  },
};
