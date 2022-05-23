import { Router } from "express";
import Controller from "./controller";
import AuthenticateController from "../../controllers/AuthenticateController";
import * as AuthValidations from "../../validations/Authentication";

const routes = new Router();

routes.post("/login", AuthValidations.store, AuthenticateController.store);

routes.get("/users", Controller.list);
routes.get("/users/:id", Controller.get);
routes.post("/users", Controller.create);
routes.delete("/users/:id", Controller.delete);
routes.put("/users/:id", Controller.update);

export default routes;
