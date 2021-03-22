import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Client from '../entities/Client';
import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', async (req, res) => {
  const clientsRepository = getRepository(Client);
  const clients = await clientsRepository.find();
  return res.json({ clients });
});

clientsRouter.post('/', async (req, res) => {
  const {
    cnpjCpf,
    name,
    email,
    phone1,
    phone2,
    address,
    neighborhood,
    city,
    state,
    zip,
  } = req.body;
  const createClientService = new CreateClientService();
  const client = await createClientService.execute({
    cnpjCpf,
    name,
    email,
    phone1,
    phone2,
    address,
    neighborhood,
    city,
    state,
    zip,
  });
  return res.status(201).json({ client });
});

clientsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    cnpjCpf,
    name,
    email,
    phone1,
    phone2,
    address,
    neighborhood,
    city,
    state,
    zip,
    status,
  } = req.body;
  const updateClientService = new UpdateClientService();
  const client = await updateClientService.execute({
    id,
    cnpjCpf,
    name,
    email,
    phone1,
    phone2,
    address,
    neighborhood,
    city,
    state,
    zip,
    status,
  });
  return res.json({ client });
});

export default clientsRouter;
