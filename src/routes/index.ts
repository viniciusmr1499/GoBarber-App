import { Router } from 'express';
import appointments from './appointments.routes';
import sessions from './sessios.routes';
import users from './user.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
