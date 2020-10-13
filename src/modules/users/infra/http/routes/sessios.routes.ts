import { Router, Request, Response } from 'express';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const authentication = new AuthenticationUserService();

    const { user, token } = await authentication.execute({ email, password });

    delete user.password;

    return response.json({ user, token});
    // return response.status(err.statusCode).json({ message: err.message });

});

export default sessionsRouter;
