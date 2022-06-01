import { Router } from "express";
import UserRoutes from "./app/resources/user/user.routes";
import ShelfRoutes from "./app/resources/shelf/shelf.routes";

const routes = new Router();

routes.use(UserRoutes);
routes.use(ShelfRoutes);

export default routes;
