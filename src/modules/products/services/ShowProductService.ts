import { AppError } from '@shared/errors/appError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

export class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const product = await ProductRepository.findOne({
            where: { id },
        });
        console.log(product);

        if (!product) {
            throw new AppError('product not found');
        }
        return product;
    }
}
