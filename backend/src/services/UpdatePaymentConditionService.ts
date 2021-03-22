import { getRepository } from 'typeorm';
import PaymentCondition from '../entities/PaymentCondition';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  status: boolean;
}

class UpdatePaymentConditionService {
  public async execute({
    id,
    name,
    status,
  }: Request): Promise<PaymentCondition> {
    const paymentConditionRepository = getRepository(PaymentCondition);
    const paymentCondition = await paymentConditionRepository.findOne(id);
    if (!paymentCondition) {
      throw new AppError('Condição de pagamento não encontrada!');
    }
    const checkPaymentConditionNameExist = await paymentConditionRepository.findOne(
      {
        where: { name },
      },
    );
    if (
      checkPaymentConditionNameExist &&
      checkPaymentConditionNameExist.id !== id
    ) {
      throw new AppError(
        'Já existe uma condição de pagamento cadastrada com esse nome',
      );
    }
    paymentCondition.name = name;
    paymentCondition.status = status;
    await paymentConditionRepository.save(paymentCondition);
    return paymentCondition;
  }
}

export default UpdatePaymentConditionService;
