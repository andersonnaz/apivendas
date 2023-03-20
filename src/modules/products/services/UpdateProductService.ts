import { AppError } from '@shared/errors/appError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const product = await ProductRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new AppError('product not found');
        }

        const [productExists] = await ProductRepository.findByName(name);
        if (productExists && name !== product.name) {
            throw new AppError('this name already exists');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await ProductRepository.save(product);

        return product;
    }
}
