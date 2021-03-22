import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Company from '../entities/Company';

interface Request {
  cnpjCpf: string;
  companyName: string;
  fantasyName: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}

class CreateCompanyService {
  public async execute({
    cnpjCpf,
    companyName,
    fantasyName,
    email,
    phone1,
    phone2,
    address,
    neighborhood,
    city,
    state,
    zip,
  }: Request): Promise<Company> {
    const companiesRepository = getRepository(Company);
    const checkCompanyExists = await companiesRepository.findOne({
      where: { cnpjCpf },
    });
    if (checkCompanyExists) {
      throw new AppError('Já existe empresa cadastrada com esse cnpj/cpf');
    }
    const company = companiesRepository.create({
      cnpjCpf,
      companyName,
      fantasyName,
      email,
      phone1,
      phone2,
      address,
      neighborhood,
      city,
      state,
      zip,
    });
    await companiesRepository.save(company);
    return company;
  }
}

export default CreateCompanyService;
