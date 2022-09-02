import { Router } from "express";
import Controller from "./controller";
import * as InventoryValidations from "../../validations/Inventory";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

// routes.get("/sectors", Controller.list);
// routes.get("/sectors/:id", Controller.get);
routes.post("/inventories", InventoryValidations.store, Controller.create);
// routes.delete("/sectors/:id", Controller.delete);
// routes.put("/sectors/:id", Controller.update);

export default routes;
