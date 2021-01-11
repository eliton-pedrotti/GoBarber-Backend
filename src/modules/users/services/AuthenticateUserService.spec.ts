import 'reflect-metadata';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';




describe('AuthenthicateUser', () => {
    it('should be able to authenticate', async () => {

        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'Eliton Pedrotti',
            email: 'eliton@gmail.com',
            password: '123456'
        });

        const res = await authenticateUser.execute({
            email: 'eliton@gmail.com',
            password: '123456'
        });

        expect(res).toHaveProperty('token');
        expect(res.user).toEqual(user);
    });


    it('should not be able to authenticate with non existing user', async () => {

        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

      

        expect(authenticateUser.execute({
            email: 'eliton@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);

       
    });

    it('should not be able to authenticate with wrong password', async () => {

        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUser.execute({
            name: 'Eliton Pedrotti',
            email: 'eliton@gmail.com',
            password: '123456'
        });


        expect(authenticateUser.execute({
            email: 'eliton@gmail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError);
    });
});