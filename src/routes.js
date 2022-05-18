import { Router } from 'express';
import UserRoutes from './app/resources/user/user.routes';

const routes = new Router();

routes.use(UserRoutes);

export default routes;
