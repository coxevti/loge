import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Product from '../entities/Product';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

import productValidation from '../validations/Product';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (req, res) => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find({
    relations: ['category'],
  });
  const unitOfMeasurement = await productsRepository.query(
    'SELECT unnest(enum_range(NULL::products_unit_enum)) as unid',
  );
  return res.json({ products, unitOfMeasurement });
});

productsRouter.post('/', productValidation.store, async (req, res) => {
  const { categoryId, name, unit, price } = req.body;
  const createProductService = new CreateProductService();
  const product = await createProductService.execute({
    categoryId,
    name,
    unit,
    price,
  });
  return res.status(201).json({ product });
});

productsRouter.put('/:id', productValidation.update, async (req, res) => {
  const { id } = req.params;
  const { categoryId, name, unit, price, status } = req.body;
  const updateProductService = new UpdateProductService();
  const product = await updateProductService.execute({
    id,
    categoryId,
    name,
    unit,
    price,
    status,
  });
  return res.json({ product });
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProductService = new DeleteProductService();
  await deleteProductService.execute({ id });
  return res.status(204).json(req.params.id);
});

export default productsRouter;
