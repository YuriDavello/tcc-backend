import { Router } from "express";
import Controller from "./controller";
import * as InventoryValidations from "../../validations/Inventory";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/inventories", Controller.list);
routes.get("/inventories/:id", Controller.get);
routes.post("/inventories", InventoryValidations.store, Controller.create);
routes.delete("/inventories/:id", Controller.delete);
routes.put("/inventories/:id", Controller.update);

export default routes;
