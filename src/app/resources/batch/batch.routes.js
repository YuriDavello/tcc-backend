import { Router } from "express";
import Controller from "./controller";
import * as BatchValidations from "../../validations/Batch";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/batches", Controller.list);
routes.get("/batches/:id", Controller.get);
routes.post("/batches", /*BatchValidations.store*/ Controller.create);
routes.delete("/batches/:id", Controller.delete);
routes.put("/batches/:id", Controller.update);

export default routes;
