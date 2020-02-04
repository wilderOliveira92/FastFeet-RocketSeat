import { Router } from 'express';

import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', SessionController.store);

routes.use(authMiddlewares);

routes.post('/recipient', RecipientController.store);

routes.put('/recipient', RecipientController.update);

export default routes;
