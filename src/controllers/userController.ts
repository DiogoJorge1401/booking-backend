import { NextFunction, Request, Response } from 'express';
import { UserUseCases } from '../useCases/userUseCases';

export class UserController {

  private userUseCases = new UserUseCases()

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userUseCases.update(req.params.id, req.body)
      res.status(200).json(updatedUser)
    } catch (err: any) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userUseCases.delete(req.params.id)
      res.status(200).json("User has been deleted.")
    } catch (err: any) {
      next(err)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userUseCases.findById(req.params.id)
      res.json(user)
    } catch (err: any) {
      next(err)
    }
  }

  findMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userUseCases.find()
      res.json(users)
    } catch (err) {
      res.status(500).json()
    }
  }


}