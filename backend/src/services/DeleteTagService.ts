import { getRepository } from 'typeorm';
import Tag from '../entities/Tag';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTagService {
  public async execute({ id }: Request): Promise<void> {
    const tagRepository = getRepository(Tag);
    const tag = await tagRepository.findOne({
      where: { id },
    });
    if (!tag) {
      throw new AppError('Id não encontrado', 403);
    }
    await tagRepository.delete(tag.id);
  }
}

export default DeleteTagService;
