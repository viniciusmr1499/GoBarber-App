import { Router } from 'express';
import appointments from './appointments.routes';
import users from './user.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);

export default routes;
