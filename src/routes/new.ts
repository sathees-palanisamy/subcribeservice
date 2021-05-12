import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Subcribe } from '../models/Subcribe';

const router = express.Router();

router.post(
  '/api/subcribes',
  requireAuth,
  [
    body('departlist').not().isEmpty().withMessage('departlist is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { departlist } = req.body;

    const subcribe = Subcribe.build({
      departlist,
      userId: req.currentUser!.email,
    });
    await subcribe.save();

    res.status(201).send(subcribe);
  }
);

export { router as createSubcribetRouter };
