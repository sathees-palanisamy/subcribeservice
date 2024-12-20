import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Subcribe } from '../models/subcribe';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.get('/api/subcribes/:userId',validateRequest,async (req: Request, res: Response) => {
  console.log('req.params.userId:' + req.params.userId);
  const subcribe = await Subcribe.find({userId: req.params.userId});

  if (!subcribe) {
    throw new NotFoundError();
  }

  console.log('extracted sucessfully:' + subcribe);
  res.send(subcribe);
});

export { router as showsubcribeRouter };
