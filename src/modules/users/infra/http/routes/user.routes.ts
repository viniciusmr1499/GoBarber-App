import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request: Request, response: Response) => {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
        avatarFileName: filename,
        user_id: id
    });

    delete user.password;

    return response.json(user);
    // return response.status(err.statusCode).json({ message: err.message });

});

export default usersRouter;
