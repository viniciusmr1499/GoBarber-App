import { Router } from 'express';

import appointments from '@modules/appointments/infra/http/routes/appointments.routes';
import providers from '@modules/appointments/infra/http/routes/providers.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import users from '@modules/users/infra/http/routes/user.routes';
import passwords from '@modules/users/infra/http/routes/password.routes';
import profile from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/providers', providers);
routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/password', passwords);
routes.use('/profile', profile);

export default routes;
