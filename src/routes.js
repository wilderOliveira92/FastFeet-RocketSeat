import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';
import FileController from './app/controller/FileController';
import SignatureController from './app/controller/SignatureController';
import OrderController from './app/controller/OrderController';

import authMiddlewares from './app/middlewares/auth';


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', SessionController.store);

routes.use(authMiddlewares);

// Recipient
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

//DeliveryMan
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman', DeliverymanController.delete);

routes.post('/files/avatar', upload.single("file"), FileController.store);

//order
routes.post('/order', OrderController.store);
routes.get('/order/:id', OrderController.index);
routes.put('/order/:id', OrderController.update);
routes.delete('/order/:id', OrderController.delete);
routes.post('/files/signature', upload.single("file"), SignatureController.store);

export default routes;
