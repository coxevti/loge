import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  status: boolean;
}

class UpdateCategoryService {
  public async execute({ id, name, status }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);
    const category = await categoriesRepository.findOne(id);
    if (!category) {
      throw new AppError('Categoria não encontrada!');
    }
    const checkCategoryNameExist = await categoriesRepository.findOne({
      where: { name },
    });
    if (checkCategoryNameExist && checkCategoryNameExist.id !== id) {
      throw new AppError('Já existe uma categoria cadastrada com esse nome');
    }
    category.name = name;
    category.status = status;
    await categoriesRepository.save(category);
    return category;
  }
}

export default UpdateCategoryService;
