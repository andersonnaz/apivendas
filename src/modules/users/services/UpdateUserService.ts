import { AppError } from '@shared/errors/appError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export default class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
    }: IRequest): Promise<User> {
        const user = await UsersRepository.findOne({ where: { id } });
        if (!user) {
            throw new AppError('user not found!');
        }
        const [emailExists] = await UsersRepository.findByEmail(email);
        if (emailExists && user.email !== email) {
            throw new AppError('email already exists!');
        }
        user.name = name;
        user.email = email;
        user.password = password;

        await UsersRepository.save(user);
        return user;
    }
}
