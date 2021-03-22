import { getRepository } from 'typeorm';
import Tag from '../entities/Tag';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreateTagService {
  public async execute({ name }: Request): Promise<Tag> {
    const tagsRepository = getRepository(Tag);
    const checkTagExists = await tagsRepository.findOne({
      where: { name },
    });
    if (checkTagExists) {
      throw new AppError('Já existe uma tag cadastrada com esse nome');
    }
    const tag = tagsRepository.create({ name });
    await tagsRepository.save(tag);
    return tag;
  }
}

export default CreateTagService;
