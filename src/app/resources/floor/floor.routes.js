import { Router } from "express";
import Controller from "./controller";
import * as FloorValidations from "../../validations/Floor";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/floors", Controller.list);
routes.get("/floors/:id", Controller.get);
routes.post("/floors", FloorValidations.store, Controller.create);
routes.delete("/floors/:id", Controller.delete);
routes.put("/floors/:id", Controller.update);

export default routes;
