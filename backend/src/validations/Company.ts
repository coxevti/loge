import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import AppError from '../errors/AppError';

const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = Yup.object().shape({
    cnpjCpf: Yup.string().required('CNPJ/CPF é um campo obrigatório'),
    companyName: Yup.string().required('Razão Social é um campo obrigatório'),
    fantasyName: Yup.string().required('Nome Fantasia é um campo obrigatório'),
    email: Yup.string().required('E-mail é um campo obrigatório'),
    phone1: Yup.string()
      .matches(phoneRegExp, 'Telefone 1 inválido')
      .required('Telefone 1 é um campo obrigatório'),
    address: Yup.string().required('Endereço é um campo obrigatório'),
    neighborhood: Yup.string().required('Bairro é um campo obrigatório'),
    city: Yup.string().required('Cidade é um campo obrigatório'),
    state: Yup.string()
      .min(2, 'Estado deve ter pelo menos 2 caracteres')
      .max(2, 'Estado deve ter no máximo 2 caracteres')
      .required('Estado é um campo obrigatório'),
    zip: Yup.number().required('CEP é um campo obrigatório'),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    throw new AppError(error.errors, 422);
  }
};

export default { update };
