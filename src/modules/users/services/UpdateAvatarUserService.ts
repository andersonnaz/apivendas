import { AppError } from '@shared/errors/appError';
import path from 'path';
import fs from 'fs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
    id: string;
    avatar: string;
}

export default class UpdateAvatarUserService {
    public async execute({ id, avatar }: IRequest): Promise<User> {
        const user = await UsersRepository.findOne({ where: { id } });
        if (!user) {
            throw new AppError('user not found!');
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatar;
        await UsersRepository.save(user);
        return user;
    }
}
