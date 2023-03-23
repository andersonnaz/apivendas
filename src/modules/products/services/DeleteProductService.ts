import { AppError } from '@shared/errors/appError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

export default class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const product = await ProductRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new AppError('product not found');
        }

        await ProductRepository.remove(product);
    }
}
