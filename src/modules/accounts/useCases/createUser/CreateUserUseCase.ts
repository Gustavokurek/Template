import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreatedUsersDTO } from '@modules/accounts/repositories/dtos/ICreatedUsersDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppErrors';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, name, password }: ICreatedUsersDTO): Promise<void> {
    const emailExist = await this.usersRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError('email Already Exists', 401);
    }
    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({ email, name, password: passwordHash });
  }
}
