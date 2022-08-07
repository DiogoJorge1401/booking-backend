import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyCookie';

const users = Router();
const userController = new UserController()

users.use(verifyToken)

users.put('/:id', verifyUser, userController.update)
users.delete('/:id', verifyUser, userController.delete)
users.get('/:id', verifyUser, userController.findOne)
users.get('/', verifyAdmin, userController.findMany)

export { users };
