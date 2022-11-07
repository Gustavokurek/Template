import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppErrors';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;
}
@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('email or password incorrect');
    }

    const passwordHash = (await user).password;
    const passwordMatch = await compare(password, passwordHash);

    if (!passwordMatch) {
      throw new AppError('email or password incorrect', 401);
    }

    const token = sign({}, 'PALAVRA-SECRETA', {
      subject: (await user).id,
      expiresIn: '1d',
    });

    const userResponse = {
      name: (await user).name,
      email: (await user).email,
    };

    return { token, user: userResponse };
  }
}
