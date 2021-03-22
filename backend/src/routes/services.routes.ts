import { Router } from 'express';
import { getRepository } from 'typeorm';
import Service from '../entities/Service';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateServiceService from '../services/CreateServiceService';
import UpdateServiceService from '../services/UpdateServiceService';

const servicesRouter = Router();
servicesRouter.use(ensureAuthenticated);

servicesRouter.get('/', async (req, res) => {
  const servicesRepository = getRepository(Service);
  const services = await servicesRepository.find();
  return res.json({ services });
});

servicesRouter.post('/', async (req, res) => {
  const { description, price } = req.body;
  const servicesRepository = new CreateServiceService();
  const service = await servicesRepository.execute({
    description,
    price,
  });
  return res.status(201).json({ service });
});

servicesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, price, status } = req.body;
  const updateServiceService = new UpdateServiceService();
  const service = await updateServiceService.execute({
    id,
    description,
    price,
    status,
  });
  return res.json({ service });
});

export default servicesRouter;
