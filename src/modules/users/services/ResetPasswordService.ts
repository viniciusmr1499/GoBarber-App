import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface RequestDTO {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokensRepository,
    ) {}

    public async execute({ token, password }: RequestDTO):Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) {
            throw new AppError('User does not exists.');
        }

        user.password = password;

        await this.usersRepository.save(user);

    }

}

export default ResetPasswordService;
