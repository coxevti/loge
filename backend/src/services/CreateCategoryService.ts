import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreateCategoryService {
  public async execute({ name }: Request): Promise<Category> {
    const nameSanitize = name.trim().toLowerCase();
    if (nameSanitize === '') {
      throw new AppError('O campo nome é obrigatório');
    }
    const categoriesRepository = getRepository(Category);
    const checkCategoryExists = await categoriesRepository.findOne({
      where: { name: nameSanitize },
    });
    if (checkCategoryExists) {
      throw new AppError('Já existe uma categoria cadastrada com esse nome');
    }
    const category = categoriesRepository.create({
      name: nameSanitize,
    });
    await categoriesRepository.save(category);
    return category;
  }
}

export default CreateCategoryService;
