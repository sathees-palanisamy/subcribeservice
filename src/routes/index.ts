import express, { Request, Response } from 'express';
import { Subcribe } from '../models/Subcribe';

const router = express.Router();

router.get('/api/subcribes', async (req: Request, res: Response) => {
  const subcribes = await Subcribe.find({});

  res.send(subcribes);
});

export { router as indexSubcribeRouter };
