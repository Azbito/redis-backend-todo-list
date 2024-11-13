import type { Task } from "@/@types/task";

let tasks: Array<Task> = [];

export const taskRepository = {
  async create(task: Task) {
    tasks.push(task);
    return task;
  },

  async list() {
    return tasks;
  },

  async get(uuid: string) {
    return tasks.find((task) => task.uuid === uuid);
  },

  async update(uuid: string, task: Task) {
    const index = tasks.findIndex((t) => t.uuid === uuid);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...task };
      return tasks[index];
    }
    return null;
  },

  async delete(uuid: string) {
    const index = tasks.findIndex((t) => t.uuid === uuid);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  },
};
