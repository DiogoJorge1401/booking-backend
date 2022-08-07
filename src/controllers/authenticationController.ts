import { NextFunction, Request, Response } from 'express';
import { AuthUseCases } from '../useCases/authenticationUseCases';

export class AuthController {

  private authUseCases = new AuthUseCases()

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authUseCases.register(req.body)
      res.status(201).json("User has been created")
    } catch (err: any) {
      next(err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, token } = await this.authUseCases.login(req.body)
      res
        .cookie("access_token", token, { httpOnly: true, })
        .json(data);
    } catch (err) {
      next(err);
    }
  }
}