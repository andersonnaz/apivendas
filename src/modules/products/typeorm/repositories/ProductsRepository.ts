import { dataSource } from '@shared/typeorm';
import Product from '../entities/Product';

export const ProductRepository = dataSource.getRepository(Product).extend({
    async findByName(name: string) {
        return this.createQueryBuilder('product')
            .where('product.name = :name', { name })
            .getMany();
    },
});
