import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    let message = {};
    if (name.trim() === '') {
      message = {...message, name: 'O campo nome é obrigatório' }
    }
    if (email.trim() === '') {
      message = {...message, email: 'O campo email é obrigatório' }
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(email).toLowerCase());
    if (!isValidEmail) {
      if (!message.email) {
        message = {...message, email: 'O campo email é inválido' }
      }
    }
    if (password.trim() === '') {
      message = {...message, password: 'O campo senha é obrigatório' }
    }
    if (password.trim().length < 6) {
      if(!message.password) {
        message = {...message, password: 'O campo senha deve ter no minimo 6 caracteres'}
      }
    }
    if (Object.keys(message).length > 0) {
      throw new AppError(message, 422);
    }
    const userRepository = getRepository(User);
    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });
    if (checkEmailExists) {
      throw new AppError(
        'Este endereço de e-mail já está registrado no sistema',
      );
    }
    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
