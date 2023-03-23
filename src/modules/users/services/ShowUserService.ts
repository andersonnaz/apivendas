import { AppError } from '@shared/errors/appError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

export default class ShowUserService {
    public async execute({ id }: IRequest): Promise<User> {
        const user = await UsersRepository.findOne({ where: { id } });
        if (!user) {
            throw new AppError('user does not exists!');
        }
        return user;
    }
}
