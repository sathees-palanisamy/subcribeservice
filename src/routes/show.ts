import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Subcribe } from '../models/Subcribe';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.get('/api/subcribes/:userId',validateRequest,async (req: Request, res: Response) => {
  const subcribe = await Subcribe.find({userId: req.params.userId});

  if (!subcribe) {
    throw new NotFoundError();
  }

  res.send(subcribe);
});

export { router as showsubcribeRouter };
