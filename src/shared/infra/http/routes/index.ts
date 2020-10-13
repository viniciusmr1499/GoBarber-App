import { Router } from 'express';

import appointments from '@modules/appointments/infra/http/routes/appointments.routes';
import sessions from '@modules/users/infra/http/routes/sessios.routes';
import users from '@modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
