import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO {
    user: User;
    token: string;
}

@injectable()
class AuthenticationUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ email, password }: RequestDTO):Promise<ResponseDTO> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            user,
            token
        };
    }
}

export default AuthenticationUserService;
