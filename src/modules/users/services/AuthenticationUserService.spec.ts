import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticationUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticationUser', () => {
    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const authenticationUser = new AuthenticationUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '5151515'
        });

        const response = await authenticationUser.execute({
            email: 'johndoe@example.com',
            password: '5151515'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('Should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticationUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: '5151515'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const authenticationUser = new AuthenticationUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '5151515'
        });

        expect(
            authenticationUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
