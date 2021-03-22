import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';
import authConfig from '../configs/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError(
        'O e-mail ou senha que você digitou está incorreto.',
        401,
      );
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new AppError(
        'O e-mail ou senha que você digitou está incorreto.',
        401,
      );
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: user.id, expiresIn });
    return { user, token };
  }
}

export default CreateSessionService;
