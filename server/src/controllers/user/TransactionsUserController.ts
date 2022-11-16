import { Request, Response } from 'express';
import { TransactionsUserService } from '../../services/user/TransactionsUserService';

class TransactionsUserController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const transactionsUserService = new TransactionsUserService();

    const transactions = await transactionsUserService.execute(userId);

    return res.status(200).json(transactions);
  }
}

export { TransactionsUserController };
