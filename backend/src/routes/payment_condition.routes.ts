import { Router } from 'express';
import { getRepository } from 'typeorm';
import PaymentCondition from '../entities/PaymentCondition';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePaymentConditionService from '../services/CreatePaymentConditionService';
import UpdatePaymentConditionService from '../services/UpdatePaymentConditionService';

const paymentConditionRouter = Router();

paymentConditionRouter.use(ensureAuthenticated);

paymentConditionRouter.get('/', async (req, res) => {
  const paymentConditionRepository = getRepository(PaymentCondition);
  const paymentCondition = await paymentConditionRepository.find({
    where: { status: true },
  });
  return res.json({ paymentCondition });
});

paymentConditionRouter.post('/', async (req, res) => {
  const { name } = req.body;
  const createPaymentConditionService = new CreatePaymentConditionService();
  const paymentCondition = await createPaymentConditionService.execute({
    name,
  });
  return res.status(201).json({ paymentCondition });
});

paymentConditionRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const updatePaymentConditionService = new UpdatePaymentConditionService();
  const paymentCondition = await updatePaymentConditionService.execute({
    id,
    name,
    status,
  });
  return res.json({ paymentCondition });
});

export default paymentConditionRouter;
