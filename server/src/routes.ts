import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  throw new Error('Error de teste');
  return res.json({ ok: true });
});

export { router };
