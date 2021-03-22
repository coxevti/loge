import { getRepository } from 'typeorm';
import PaymentCondition from '../entities/PaymentCondition';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreatePaymentConditionService {
  public async execute({ name }: Request): Promise<PaymentCondition> {
    const paymentConditionRepository = getRepository(PaymentCondition);
    const checkPaymentConditionExists = await paymentConditionRepository.findOne(
      {
        where: { name },
      },
    );
    if (checkPaymentConditionExists) {
      throw new AppError(
        'Já existe uma condição de pagamento cadastrada com esse nome',
      );
    }
    const paymentCondition = paymentConditionRepository.create({ name });
    await paymentConditionRepository.save(paymentCondition);
    return paymentCondition;
  }
}

export default CreatePaymentConditionService;
