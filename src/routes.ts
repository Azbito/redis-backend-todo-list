import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./controller/user-controller";
import { TaskController } from "./controller/task-controller";
import { AuthController } from "./controller/auth-controller";
import { jwtVerify } from "./@utils/jwt-verify";
import { UserRepository } from "./repositories/user-repositories";
import { TaskRepository } from "./repositories/task-repositories";
import { AuthService } from "./services/auth-services";

export const appRoutes = async (app: FastifyInstance) => {
  const userRepository = new UserRepository(app);
  const userController = new UserController(userRepository);

  app.get("/users/:id", userController.getUserById.bind(userController));

  const taskRepository = new TaskRepository(app);
  const taskController = new TaskController(taskRepository);

  app.post(
    "/tasks",
    { onRequest: [jwtVerify] },
    taskController.create.bind(taskController)
  );
  app.get("/tasks", taskController.list.bind(taskController));
  app.get("/tasks/:uuid", taskController.get.bind(taskController));

  app.put(
    "/tasks/:uuid",
    { onRequest: [jwtVerify] },
    async (
      request: FastifyRequest<{ Params: { uuid: string }; Body: any }>,
      reply: FastifyReply
    ) => {
      return taskController.update(request, reply);
    }
  );

  app.delete(
    "/tasks/:uuid",
    { onRequest: [jwtVerify] },
    async (
      request: FastifyRequest<{ Params: { uuid: string }; Body: any }>,
      reply: FastifyReply
    ) => {
      return taskController.delete(request, reply);
    }
  );

  const authService = new AuthService(userRepository, app);
  const authController = new AuthController(authService);

  app.post("/auth/register", authController.register.bind(authController));
  app.post("/auth/login", authController.login.bind(authController));
};
