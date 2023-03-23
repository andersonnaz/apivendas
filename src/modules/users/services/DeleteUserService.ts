import { AppError } from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

export default class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const user = await UsersRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new AppError('user does not exists!');
        }
        await UsersRepository.remove(user);
    }
}
