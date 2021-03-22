import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Client from '../entities/Client';

interface Request {
  id: string;
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
  status: boolean;
}

class UpdateClientService {
  public async execute({
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
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);
    const client = await clientsRepository.findOne(id);
    if (!client) {
      throw new AppError('Cliente não encontrado!');
    }
    const checkClientCnpjCpfExist = await clientsRepository.findOne({
      where: { cnpjCpf },
    });
    if (checkClientCnpjCpfExist && checkClientCnpjCpfExist.id !== id) {
      throw new AppError('Não foi possivel salva os dados do cliente');
    }
    client.cnpjCpf = cnpjCpf;
    client.name = name;
    client.email = email;
    client.phone1 = phone1;
    client.phone2 = phone2;
    client.address = address;
    client.neighborhood = neighborhood;
    client.city = city;
    client.state = state;
    client.zip = zip;
    client.status = status;
    await clientsRepository.save(client);
    return client;
  }
}

export default UpdateClientService;
