import { Router } from "express";
import Controller from "./controller";
import * as ShelfValidations from "../../validations/Shelf";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/shelves", Controller.list);
routes.get("/shelves/:id", Controller.get);
routes.post("/shelves", ShelfValidations.store, Controller.create);
routes.delete("/shelves/:id", Controller.delete);
routes.put("/shelves/:id", Controller.update);

export default routes;
