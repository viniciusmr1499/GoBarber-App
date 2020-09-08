import { Router, Request, Response } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const authentication = new AuthenticationUserService();

        const { user, token } = await authentication.execute({ email, password });

        delete user.password;

        return response.json({ user, token});

    } catch(err) {
        return response.status(400).json({ message: err.message });
    }
});

export default sessionsRouter;
