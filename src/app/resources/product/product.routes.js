import { Router } from "express";
import Controller from "./controller";
import * as ProductValidations from "../../validations/Product";
// import AuthMiddleware from "../../middlewares/AuthMiddleware";

const routes = new Router();

routes.get("/products", Controller.list);
routes.get("/products/notRelated", Controller.listNonRelatedProducts);
routes.get("/products/:id", Controller.get);
routes.post("/products", ProductValidations.store, Controller.create);
routes.delete("/products/:id", Controller.delete);
routes.put("/products/:id", Controller.update);

export default routes;
