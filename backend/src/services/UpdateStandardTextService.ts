import { getRepository } from 'typeorm';
import StandardText, { StandardTextType } from '../entities/StandardText';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  description: string;
  type: StandardTextType;
}

class UpdateStandardTextService {
  public async execute({
    id,
    name,
    description,
    type,
  }: Request): Promise<StandardText> {
    const standardTextsRepository = getRepository(StandardText);
    const standardText = await standardTextsRepository.findOne(id);
    if (!standardText) {
      throw new AppError('Texto padrão não encontrado!');
    }
    const checkStandardTextTypeExist = await standardTextsRepository.findOne({
      where: { type },
    });
    if (checkStandardTextTypeExist && checkStandardTextTypeExist.id !== id) {
      throw new AppError(
        'Já existe uma texto default cadastrada com esse tipo',
      );
    }
    standardText.name = name;
    standardText.description = description;
    standardText.type = type;
    await standardTextsRepository.save(standardText);
    return standardText;
  }
}

export default UpdateStandardTextService;
