import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('Usuário não encontrada!');
    }
    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkEmailExists && checkEmailExists.id !== id) {
      throw new AppError(
        'Este endereço de e-mail já está registrado no sistema',
      );
    }
    user.name = name;
    user.email = email;
    if (password.trim().length > 0) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserService;
