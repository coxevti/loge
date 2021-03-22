import { getRepository } from 'typeorm';
import Service from '../entities/Service';
import AppError from '../errors/AppError';

interface Request {
  description: string;
  price: number;
}

class CreateServiceService {
  public async execute({ description, price }: Request): Promise<Service> {
    const servicesRepository = getRepository(Service);
    const checkServiceExists = await servicesRepository.findOne({
      where: { description },
    });
    if (checkServiceExists) {
      throw new AppError('Já existe uma serviço cadastrada com esse nome');
    }
    const service = servicesRepository.create({
      description,
      price,
    });
    await servicesRepository.save(service);
    return service;
  }
}

export default CreateServiceService;
