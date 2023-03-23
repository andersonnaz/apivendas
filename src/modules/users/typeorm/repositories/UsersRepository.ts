import { dataSource } from '@shared/typeorm';
import User from '../entities/User';

export const UsersRepository = dataSource.getRepository(User).extend({
    async findByEmail(email: string) {
        return this.createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getMany();
    },
});
