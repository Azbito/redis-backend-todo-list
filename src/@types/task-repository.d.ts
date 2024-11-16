declare module "task-repository" {
  export type TaskRepository = {
    create: (task: Task, authorId: string) => Promise<Task>;
    list: () => Promise<Task[]>;
    get: (uuid: string) => Promise<Task | null>;
    update(
      uuid: string,
      taskData: Partial<Task>,
      authorId: string
    ): Promise<Task | null>;
    delete: (uuid: string, authorId: string) => Promise<boolean>;
  };
}
