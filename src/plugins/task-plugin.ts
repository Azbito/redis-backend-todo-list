import { taskController } from "@/controller/task-controller";
import { FastifyPluginAsync } from "fastify";

const taskPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.post("/tasks", taskController.create);
  fastify.get("/tasks", taskController.list);
  fastify.get("/tasks/:uuid", taskController.get);
  fastify.put("/tasks/:uuid", taskController.update);
  fastify.delete("/tasks/:uuid", taskController.delete);
};

export default taskPlugin;
