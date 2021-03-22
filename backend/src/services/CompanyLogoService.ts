import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import multerConfig from '../configs/multer';
import AppError from '../errors/AppError';
import Company from '../entities/Company';

interface Request {
  companyId: string;
  filenameCompanyLogo: string;
}

class CompanyLogoService {
  public async execute({
    companyId,
    filenameCompanyLogo,
  }: Request): Promise<Company> {
    const companiesRepository = getRepository(Company);
    const company = await companiesRepository.findOne(companyId);
    if (!company) {
      throw new AppError('Empresa desconhecido', 401);
    }
    if (company.companyLogo) {
      const filenamePath = path.join(
        multerConfig.directoryUpload,
        company.companyLogo,
      );
      fs.access(filenamePath, async err => {
        if (err) {
          return;
        }
        await fs.promises.unlink(filenamePath);
      });
    }
    company.companyLogo = filenameCompanyLogo;
    await companiesRepository.save(company);
    return company;
  }
}

export default CompanyLogoService;
