import { Router, Request, Response } from 'express';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authentication = new AuthenticationUserService(usersRepository);

    const { user, token } = await authentication.execute({ email, password });

    delete user.password;

    return response.json({ user, token});

});

export default sessionsRouter;
