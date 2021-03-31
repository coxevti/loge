import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import AppError from '../errors/AppError';

const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Nome é um campo obrigatório'),
    categoryId: Yup.string().required('Categoria é um campo obrigatório'),
    unit: Yup.string().required('Unidade é um campo obrigatório'),
    price: Yup.string().required('Preço é um campo obrigatório'),
    status: Yup.string().required('Status é um campo obrigatório'),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    throw new AppError(error.errors, 422);
  }
};

const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Nome é um campo obrigatório'),
    categoryId: Yup.string().required('Categoria é um campo obrigatório'),
    unit: Yup.string().required('Unidade é um campo obrigatório'),
    price: Yup.string().required('Preço é um campo obrigatório'),
    status: Yup.string().required('Status é um campo obrigatório'),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    throw new AppError(error.errors, 422);
  }
};

export default { store, update };
