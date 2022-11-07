import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeOrm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppErrors';

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'PALAVRA-SECRETA') as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('user does not exist', 401);
    }
    next();
  } catch (e) {
    throw new AppError(e);
  }
}
