import type { Task } from "../models/task";

export interface TaskRepository {
  create(task: Task, authorId: string): Promise<Task>;
  list(): Promise<Task[]>;
  get(uuid: string): Promise<Task | null | undefined>;
  update(
    uuid: string,
    task: Task,
    authorId: string
  ): Promise<Task | null | undefined>;
  delete(uuid: string, authorId: string): Promise<boolean>;
}
