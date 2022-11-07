import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authenticateRoutes = Router();

const authenticateController = new AuthenticateUserController();
authenticateRoutes.post('/session', authenticateController.handle);
