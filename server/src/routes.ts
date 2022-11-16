import { Router } from 'express';
import { CashOutTransactionController } from './controllers/transaction/CashOutTransactionController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { userValidation } from './middlewares/userValidation';

const router = Router();

router.post('/users', userValidation, new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.post('/cash-out', isAuthenticated, new CashOutTransactionController().handle);

export { router };
