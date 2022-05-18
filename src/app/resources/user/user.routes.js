import { Router } from 'express';
import Controller from './controller';

const routes = new Router();

routes.get('/users', Controller.list);
routes.get('/users/:id', Controller.get);
routes.post('/users', Controller.create);
routes.delete('/users/:id', Controller.delete);
routes.put('/users/:id', Controller.update);

export default routes;
