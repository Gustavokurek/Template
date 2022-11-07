import { Router } from 'express';

import { UserCreateController } from '@modules/accounts/useCases/createUser/CreateUserController';

export const usersRoutes = Router();

const userController = new UserCreateController();
usersRoutes.post('/', userController.handle);
