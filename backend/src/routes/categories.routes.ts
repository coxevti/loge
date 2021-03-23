import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', async (req, res) => {
  const categoriesRepository = getRepository(Category);
  const categories = await categoriesRepository.find();
  return res.json({ categories });
});

categoriesRouter.post('/', async (req, res) => {
  const { name } = req.body;
  const createCategoryService = new CreateCategoryService();
  const category = await createCategoryService.execute({ name });
  return res.status(201).json({ category });
});

categoriesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const updateCategoryService = new UpdateCategoryService();
  const category = await updateCategoryService.execute({ id, name, status });
  return res.json({ category });
});

categoriesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCategoryService = new DeleteCategoryService();
  await deleteCategoryService.execute({ id });
  return res.status(204).json(req.params.id);
});

export default categoriesRouter;
