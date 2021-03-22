import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product, { ProductUnits } from '../entities/Product';

interface Request {
  id: string;
  categoryId: string;
  name: string;
  unit: ProductUnits;
  price: number;
  status: boolean;
}

class UpdateProductService {
  public async execute({
    id,
    categoryId,
    name,
    unit,
    price,
    status,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado!');
    }
    const checkProductNameExist = await productsRepository.findOne({
      where: { name },
    });
    if (checkProductNameExist && checkProductNameExist.id !== id) {
      throw new AppError('Já existe uma produto cadastrada com esse nome');
    }
    product.categoryId = categoryId;
    product.name = name;
    product.unit = unit;
    product.price = price;
    product.status = status;
    await productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
