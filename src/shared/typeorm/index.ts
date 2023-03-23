import User from '@modules/users/typeorm/entities/User';
import { DataSource } from 'typeorm';
import Product from '../../modules/products/typeorm/entities/Product';
import { CreateProducts1678396605521 } from './migrations/1678396605521-CreateProducts';
import { CreateUsers1679512263206 } from './migrations/1679512263206-CreateUsers';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    entities: [Product, User],
    migrations: [CreateProducts1678396605521, CreateUsers1679512263206],
});
