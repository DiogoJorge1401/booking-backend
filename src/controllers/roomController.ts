import { NextFunction, Request, Response } from 'express';
import { RoomUseCases } from '../useCases/roomUseCases';

export class RoomController {

  private roomUseCases = new RoomUseCases()

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotelId = req.params.hotelId
      const room = await this.roomUseCases.create(hotelId, req.body)
      res.status(201).json(room)
    } catch (err: any) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedHotel = await this.roomUseCases.update(req.params.id, req.body)
      res.status(200).json(updatedHotel)
    } catch (err: any) {
      next(err)
    }
  }

  updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedHotel = await this.roomUseCases
        .updateAvailability(req.params.id, req.body)

      res.status(200).json("Room has been upated")
    } catch (err: any) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.roomUseCases.delete(req.params.id)
      res.status(200).json("Room has been deleted.")
    } catch (err: any) {
      next(err)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotel = await this.roomUseCases.findById(req.params.id)
      res.json(hotel)
    } catch (err: any) {
      next(err)
    }
  }

  findMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotels = await this.roomUseCases.find()
      res.json(hotels)
    } catch (err) {
      res.status(500).json()
    }
  }

}