import { Router } from 'express';

import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', SessionController.store);

routes.use(authMiddlewares);

// Recipient
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

//DeliveryMan
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman', DeliverymanController.update);
routes.delete('/deliveryman', DeliverymanController.delete);


export default routes;
