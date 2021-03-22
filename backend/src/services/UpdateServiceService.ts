import { getRepository } from 'typeorm';
import Service from '../entities/Service';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  description: string;
  price: number;
  status: boolean;
}

class UpdateServiceService {
  public async execute({
    id,
    description,
    price,
    status,
  }: Request): Promise<Service> {
    const serviceRepository = getRepository(Service);
    const service = await serviceRepository.findOne(id);
    if (!service) {
      throw new AppError('Serviço não encontrado!');
    }
    const checkServiceDescriptionExist = await serviceRepository.findOne({
      where: { description },
    });
    if (
      checkServiceDescriptionExist &&
      checkServiceDescriptionExist.id !== id
    ) {
      throw new AppError('Já existe um serviço cadastrada com esse nome');
    }
    service.description = description;
    service.price = price;
    service.status = status;
    await serviceRepository.save(service);
    return service;
  }
}

export default UpdateServiceService;
