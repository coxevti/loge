import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Client from '../entities/Client';

interface Request {
  cnpjCpf: string;
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}

class CreateClientService {
  public async execute({
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
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);
    const checkClientExists = await clientsRepository.findOne({
      where: { cnpjCpf },
    });
    if (checkClientExists) {
      throw new AppError('Já existe uma cliente cadastrada com esse cnpj/cpf');
    }
    const client = clientsRepository.create({
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
    await clientsRepository.save(client);
    return client;
  }
}

export default CreateClientService;
