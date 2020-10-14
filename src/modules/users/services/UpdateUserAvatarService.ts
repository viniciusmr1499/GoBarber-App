import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
