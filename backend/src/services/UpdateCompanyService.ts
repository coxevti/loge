import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Company from '../entities/Company';

interface Request {
  id: string;
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
  status: boolean;
}

class UpdateCompanyService {
  public async execute({
    id,
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
    status,
  }: Request): Promise<Company> {
    const re = /(^(\d{14}|\d{11})$)/;
    const isValidCnpjCpf = re.test(cnpjCpf);
    if (!isValidCnpjCpf) {
      throw new AppError('CNPJ/CPF Inválido');
    }
    const companiesRepository = getRepository(Company);
    const company = await companiesRepository.findOne(id);
    if (!company) {
      throw new AppError('Empresa não encontrado!');
    }
    const checkCompanyCnpjCpfExist = await companiesRepository.findOne({
      where: { cnpjCpf },
    });
    if (checkCompanyCnpjCpfExist && checkCompanyCnpjCpfExist.id !== id) {
      throw new AppError('Não foi possivel salva os dados da empresa');
    }
    company.cnpjCpf = cnpjCpf;
    company.companyName = companyName;
    company.fantasyName = fantasyName;
    company.email = email;
    company.phone1 = phone1;
    company.phone2 = phone2;
    company.address = address;
    company.neighborhood = neighborhood;
    company.city = city;
    company.state = state;
    company.zip = zip;
    company.status = status;
    await companiesRepository.save(company);
    return company;
  }
}

export default UpdateCompanyService;
