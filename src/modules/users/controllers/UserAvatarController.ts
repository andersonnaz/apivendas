import UpdateAvatarUserService from '../services/UpdateAvatarUserService';
import { Request, Response } from 'express';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;
        const avatar = request.file?.filename as string;

        const updateAvatarUser = new UpdateAvatarUserService();
        const user = await updateAvatarUser.execute({
            id,
            avatar,
        });
        return response.json(user);
    }
}
