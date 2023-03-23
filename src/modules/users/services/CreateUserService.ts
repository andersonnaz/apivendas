import { AppError } from '@shared/errors/appError';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const [userExists] = await UsersRepository.findByEmail(email);
        if (userExists) {
            throw new AppError('email in use');
        }
        const hashedPassword = await hash(password, 8);
        const user = await UsersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await UsersRepository.save(user);
        return user;
    }
}
