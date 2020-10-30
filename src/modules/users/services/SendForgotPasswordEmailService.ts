import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/ImailProvider';

interface RequestDTO {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: RequestDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User do not exists.');
        }

        const { token } = await this.userTokensRepository.generate(user.id)

        await this.mailProvider.sendMail(
            email,
            `Pedido de recuperação de senha recebido: ${token}`,
        );
    }

}

export default SendForgotPasswordEmailService;
