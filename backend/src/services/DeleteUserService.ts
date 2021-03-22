import { getRepository } from 'typeorm';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  userIdAuth: string;
}

class DeleteUserService {
  public async execute({ id, userIdAuth }: Request): Promise<void> {
    if (id === userIdAuth) {
      throw new AppError(
        'Usuário selecionado atual conectado, não é permitida.',
        403,
      );
    }
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new AppError('Id não encontrado', 403);
    }
    await userRepository.delete(user.id);
  }
}

export default DeleteUserService;
