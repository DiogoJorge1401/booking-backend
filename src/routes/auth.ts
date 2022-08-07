import { Router } from 'express';
import { AuthController } from '../controllers/authenticationController';
import { verifyAdmin, verifyToken } from '../utils/verifyCookie';

const auth = Router();

const authController = new AuthController()

auth
  .post('/register', authController.register)
  .post('/login', authController.login)

auth
  .get('/checkauthentication', verifyToken, (req, res) => res.json('is authenticated'))
  .get('/checkadmin', verifyToken, verifyAdmin, (req, res) => res.json('is admin'))

export { auth };
