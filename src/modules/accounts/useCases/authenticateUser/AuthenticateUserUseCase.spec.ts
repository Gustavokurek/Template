import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppErrors';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUser = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'Teste-User',
      email: 'teste@teste.com',
      password: '11111',
      driver_license: '132131546s',
    };
    await createUser.execute(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'userNonexistent@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user witch password incorrect', async () => {
    expect(async () => {
      const user = {
        name: 'Teste-User',
        email: 'teste@teste.com',
        password: '11111',
        driver_license: '132131546s',
      };
      await createUser.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
