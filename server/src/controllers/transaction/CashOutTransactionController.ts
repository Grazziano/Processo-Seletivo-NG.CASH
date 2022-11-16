import { Request, Response } from 'express';
import { CashOutTransactionService } from '../../services/transaction/CashOutTransactionService';

class CashOutTransactionController {
  async handle(req: Request, res: Response) {
    const { username, value } = req.body;
    const userId = req.user_id;

    const cashOutTransactionService = new CashOutTransactionService();

    const transaction = await cashOutTransactionService.execute({
      username,
      value,
      userId,
    });

    return res.status(200).json(transaction);
  }
}

export { CashOutTransactionController };
