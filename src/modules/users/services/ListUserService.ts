import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
    public async execute(): Promise<User[]> {
        return UsersRepository.find();
    }
}
