import { Router } from 'express';
import { getRepository } from 'typeorm';
import Tag from '../entities/Tag';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateTagService from '../services/CreateTagService';
import DeleteTagService from '../services/DeleteTagService';
import UpdateTagService from '../services/UpdateTagService';

const tagsRouter = Router();

tagsRouter.use(ensureAuthenticated);

tagsRouter.get('/', async (req, res) => {
  const tagsRepository = getRepository(Tag);
  const tags = await tagsRepository.find({
    where: { status: true },
  });
  return res.json({ tags });
});

tagsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  const createTagService = new CreateTagService();
  const tag = await createTagService.execute({ name });
  return res.status(201).json({ tag });
});

tagsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const updateTagService = new UpdateTagService();
  const tag = await updateTagService.execute({ id, name, status });
  return res.json({ tag });
});

tagsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteTagService = new DeleteTagService();
  await deleteTagService.execute({ id });
  return res.status(204).json(req.params.id);
});

export default tagsRouter;
