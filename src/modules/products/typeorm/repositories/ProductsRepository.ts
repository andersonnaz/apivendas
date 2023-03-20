import { dataSource } from '@shared/typeorm';
import Product from '../entities/Product';

export const ProductRepository = dataSource.getRepository(Product).extend({
    async findByName(name: string) {
        return this.createQueryBuilder('products')
            .where('products.name = :name', { name })
            .getMany();
    },
});
