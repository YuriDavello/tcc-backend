import { Router } from "express";
import Controller from "./controller";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/floors", Controller.list);
routes.get("/floors/:id", Controller.get);
routes.delete("/floors/:id", Controller.delete);

export default routes;
