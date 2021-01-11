import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';



const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const useAvatarController = new UserAvatarController();



usersRouter.post('/', usersController.create);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), useAvatarController.update);

export default usersRouter;
