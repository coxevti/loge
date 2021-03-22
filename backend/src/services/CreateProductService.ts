import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product, { ProductUnits } from '../entities/Product';

interface Request {
  categoryId: string;
  name: string;
  unit: ProductUnits;
  price: number;
}

class CreateProductService {
  public async execute({
    categoryId,
    name,
    unit,
    price,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const checkProductExists = await productsRepository.findOne({
      where: { name },
    });
    if (checkProductExists) {
      throw new AppError('Já existe um produto cadastrada com esse nome');
    }
    const product = productsRepository.create({
      categoryId,
      name,
      unit,
      price,
    });
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
