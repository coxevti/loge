import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import AvatarUserService from '../services/AvatarUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import storageMulter from '../configs/multer';
import User from '../entities/User';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();
const upload = multer(storageMulter);

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  return res.json({ users });
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email, password });
  delete user.password;
  return res.status(201).json(user);
});

usersRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const updateUserService = new UpdateUserService();
  const user = await updateUserService.execute({ id, name, email, password });
  return res.json({ user });
});

usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteUserService = new DeleteUserService();
  await deleteUserService.execute({ id, userIdAuth: req.user.id });
  return res.status(204).json(req.params.id);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const avatarUserService = new AvatarUserService();
    const user = await avatarUserService.execute({
      userId: req.user.id,
      filenameAvatar: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);

export default usersRouter;
