import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute();

    return res.status(200).json(user);
  }
}

export { DetailUserController };
