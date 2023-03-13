import { DataSource } from 'typeorm';
import Product from '../../modules/products/typeorm/entities/Product';
import { CreateProducts1678396605521 } from './migrations/1678396605521-CreateProducts';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    entities: [Product],
    migrations: [CreateProducts1678396605521],
});
