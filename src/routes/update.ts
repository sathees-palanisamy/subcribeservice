import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {validateRequest} from '../middlewares/validate-request';
import {NotFoundError} from '../errors/not-found-error';
import {requireAuth} from '../middlewares/require-auth';
import {NotAuthorizedError} from '../errors/not-authorized-error';

import { Subcribe } from '../models/subcribe';

const router = express.Router();

router.put(
  '/api/subcribes/:id',
  requireAuth,
  [
    body('departlist').not().isEmpty().withMessage('departlist is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const subcribe = await Subcribe.findById(req.params.id);

    if (!subcribe) {
      throw new NotFoundError();
    }

    if (subcribe.userId !== req.currentUser!.email) {
      throw new NotAuthorizedError();
    }

    subcribe.set({
      departlist: req.body.departlist,
    });
    await subcribe.save();

    res.send(subcribe);
  }
);

export { router as updateSubcribeRouter };
