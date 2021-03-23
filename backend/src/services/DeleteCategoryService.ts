import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: Request): Promise<void> {
    const categoriRepository = getRepository(Category);
    const category = await categoriRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new AppError('Id não encontrado', 403);
    }
    await categoriRepository.delete(category.id);
  }
}

export default DeleteCategoryService;
