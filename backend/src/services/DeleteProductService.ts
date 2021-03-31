import { getRepository } from 'typeorm';
import Product from '../entities/Product';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('Id não encontrado', 403);
    }
    await productRepository.delete(product.id);
  }
}

export default DeleteProductService;
