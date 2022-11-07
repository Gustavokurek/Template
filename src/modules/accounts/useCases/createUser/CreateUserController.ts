import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreatedUsersDTO } from '@modules/accounts/repositories/dtos/ICreatedUsersDTO';

import { CreateUserUseCase } from './CreateUserUseCase';

export class UserCreateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, name, password }: ICreatedUsersDTO = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({ email, name, password });
    return res.status(201).json();
  }
}
