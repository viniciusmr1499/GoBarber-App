import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: RequestDTO):Promise<User> {
        const userCheckExists = await this.usersRepository.findByEmail(email);

        if(userCheckExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }

}

export default CreateUserService;
