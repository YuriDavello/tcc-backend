import { Router } from "express";
import UserRoutes from "./app/resources/user/user.routes";
import ShelfRoutes from "./app/resources/shelf/shelf.routes";
import GetUserByToken from "./app/controllers/getUserByToken";

const routes = new Router();

routes.use(UserRoutes);
routes.use(ShelfRoutes);

routes.get("/getUserByToken/:token", GetUserByToken.getUser);

export default routes;
