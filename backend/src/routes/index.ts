import { Router } from 'express';
import categoriesRouter from './categories.routes';
import paymentConditionRouter from './payment_condition.routes';
import servicesRouter from './services.routes';
import sessionsRouter from './sessions.routes';
import standardTextRouter from './standard_text.routes';
import tagsRouter from './tags.routes';
import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import companiesRouter from './companies.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/services', servicesRouter);
routes.use('/tags', tagsRouter);
routes.use('/payment-condition', paymentConditionRouter);
routes.use('/standard-texts', standardTextRouter);
routes.use('/clients', clientsRouter);
routes.use('/companies', companiesRouter);
routes.use('/products', productsRouter);

export default routes;
