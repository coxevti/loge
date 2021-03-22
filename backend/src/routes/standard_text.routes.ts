import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import StandardText from '../entities/StandardText';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateStandardTextService from '../services/CreateStandardTextService';
import UpdateStandardTextService from '../services/UpdateStandardTextService';

const standardTextRouter = Router();
const upload = multer();

standardTextRouter.use(ensureAuthenticated);

standardTextRouter.get('/', async (req, res) => {
  const standardTextRepository = getRepository(StandardText);
  const standardTexts = await standardTextRepository.find();
  return res.json({ standardTexts });
});

standardTextRouter.post('/', upload.none(), async (req, res) => {
  const { name, description, type } = req.body;
  const createStandardTextService = new CreateStandardTextService();
  const standardText = await createStandardTextService.execute({
    name,
    description,
    type,
  });
  return res.status(201).json({ standardText });
});

standardTextRouter.put('/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { name, description, type } = req.body;
  const updateStandardTextService = new UpdateStandardTextService();
  const standardText = await updateStandardTextService.execute({
    id,
    name,
    description,
    type,
  });
  return res.json({ standardText });
});

export default standardTextRouter;
