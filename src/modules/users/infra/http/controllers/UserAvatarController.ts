import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        const { filename } = request.file;

        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            avatarFileName: filename,
            user_id: id
        });

        delete user.password;

        return response.json(user);
    }
}
