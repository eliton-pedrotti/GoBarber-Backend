import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';


export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            const createUser = container.resolve(CreateUserService);

            const user = await createUser.execute({
                name,
                email,
                password
            })

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };

            return res.json(userWithoutPassword);


        } catch (error) {

            return res.status(400).json({ error: error.message })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return res.json(userWithoutPassword);
    }
}