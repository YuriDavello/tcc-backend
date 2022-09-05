import { Router } from "express";
import UserRoutes from "./app/resources/user/user.routes";
import ShelfRoutes from "./app/resources/shelf/shelf.routes";
import FloorRoutes from "./app/resources/floor/floor.routes";
import SectorRoutes from "./app/resources/sector/sector.routes";
import ProductRoutes from "./app/resources/product/product.routes";
import InventoryRoutes from "./app/resources/inventory/inventory.routes";
import GetUserByToken from "./app/controllers/getUserByToken";
import MappedController from "./app/controllers/MappedController";

const routes = new Router();

routes.use(UserRoutes);
routes.use(ShelfRoutes);
routes.use(FloorRoutes);
routes.use(SectorRoutes);
routes.use(ProductRoutes);
routes.use(InventoryRoutes);

routes.get("/mappedProduct/:productId", MappedController.mapped);
routes.get("/getUserByToken/:token", GetUserByToken.getUser);

export default routes;
