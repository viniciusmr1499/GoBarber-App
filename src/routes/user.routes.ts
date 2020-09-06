import { Router, Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
    try {
        // TODO
    }catch(err){
        return response.status(400).json({ message: err.message });
    }
});

usersRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        const createUser= new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return response.json(user);

    } catch(err) {
        return response.status(400).json({ message: err.message });
    }
});

export default usersRouter;
