import { Router } from "express";
import Controller from "./controller";
import AuthenticateController from "../../controllers/AuthenticateController";
import * as AuthValidations from "../../validations/Authentication";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.post("/login", AuthValidations.store, AuthenticateController.store);

routes.use(AuthMiddleware);

routes.get("/users", Controller.list);
routes.get("/users/:id", Controller.get);
routes.post("/users", Controller.create);
routes.delete("/users/:id", Controller.delete);
routes.put("/users/:id", Controller.update);

export default routes;
