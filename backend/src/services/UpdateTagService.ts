import { getRepository } from 'typeorm';
import Tag from '../entities/Tag';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  status: boolean;
}

class UpdateTagService {
  public async execute({ id, name, status }: Request): Promise<Tag> {
    const tagsRepository = getRepository(Tag);
    const tag = await tagsRepository.findOne(id);
    if (!tag) {
      throw new AppError('Tag não encontrada!');
    }
    const checkTagNameExist = await tagsRepository.findOne({
      where: { name },
    });
    if (checkTagNameExist && checkTagNameExist.id !== id) {
      throw new AppError('Já existe uma tag cadastrada com esse nome');
    }
    tag.name = name;
    tag.status = status;
    await tagsRepository.save(tag);
    return tag;
  }
}

export default UpdateTagService;
