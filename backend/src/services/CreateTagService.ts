import { getRepository } from 'typeorm';
import Tag from '../entities/Tag';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreateTagService {
  public async execute({ name }: Request): Promise<Tag> {
    const nameSanitize = name.trim().toLowerCase();
    if (nameSanitize === '') {
      throw new AppError('O campo nome é obrigatório');
    }
    const tagsRepository = getRepository(Tag);
    const checkTagExists = await tagsRepository.findOne({
      where: { name: nameSanitize },
    });
    if (checkTagExists) {
      throw new AppError('Já existe uma tag cadastrada com esse nome');
    }
    const tag = tagsRepository.create({ name: nameSanitize });
    await tagsRepository.save(tag);
    return tag;
  }
}

export default CreateTagService;
