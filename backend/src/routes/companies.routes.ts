import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Company from '../entities/Company';
import CreateCompanyService from '../services/CreateCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';
import storageMulter from '../configs/multer';
import CompanyLogoService from '../services/CompanyLogoService';

const companiesRouter = Router();
const upload = multer(storageMulter);

companiesRouter.use(ensureAuthenticated);

companiesRouter.get('/', async (req, res) => {
  const companiesRepository = getRepository(Company);
  const companies = await companiesRepository.find();
  return res.json({ companies });
});

companiesRouter.post('/', async (req, res) => {
  const {
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
  } = req.body;
  const createCompanyService = new CreateCompanyService();
  const company = await createCompanyService.execute({
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
  return res.status(201).json({ company });
});

companiesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  const updateCompanyService = new UpdateCompanyService();
  const company = await updateCompanyService.execute({
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
  });
  return res.json({ company });
});

companiesRouter.patch(
  '/logo',
  ensureAuthenticated,
  upload.single('companyLogo'),
  async (req, res) => {
    const companyLogoService = new CompanyLogoService();
    const company = await companyLogoService.execute({
      companyId: req.body.companyId,
      filenameCompanyLogo: req.file.filename,
    });
    return res.json(company);
  },
);

export default companiesRouter;
