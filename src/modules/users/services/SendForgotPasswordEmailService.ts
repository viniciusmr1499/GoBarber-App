import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/ImailProvider';


// import User from '@modules/users/infra/typeorm/entities/User';

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
    ) {}

    public async execute({ email }: RequestDTO):Promise<void> {
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.');
    }

}

export default SendForgotPasswordEmailService;
