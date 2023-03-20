import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export class ListProductService {
    public async execute(): Promise<Product[]> {
        return ProductRepository.find();
    }
}
