import { getRepository } from 'typeorm';
import StandardText, { StandardTextType } from '../entities/StandardText';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  description: string;
  type: StandardTextType;
}

class CreateStandardTextService {
  public async execute({
    name,
    description,
    type,
  }: Request): Promise<StandardText> {
    const standardTextsRepository = getRepository(StandardText);
    const checkTypeExists = await standardTextsRepository.findOne({
      where: { type },
    });
    if (checkTypeExists) {
      throw new AppError(
        'Já existe uma texto default cadastrada com esse tipo',
      );
    }
    const standardText = standardTextsRepository.create({
      name,
      description,
      type,
    });
    await standardTextsRepository.save(standardText);
    return standardText;
  }
}

export default CreateStandardTextService;
