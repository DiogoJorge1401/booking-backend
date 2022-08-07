import { NextFunction, Request, Response } from 'express';
import { HotelUseCases } from '../useCases/hotelUseCases';

export class HotelController {

  private hotelUseCases = new HotelUseCases()

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const savedHotel = await this.hotelUseCases.create(req.body)
      res.status(201).json(savedHotel)
    } catch (err: any) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedHotel = await this.hotelUseCases.update(req.params.id, req.body)
      res.status(200).json(updatedHotel)
    } catch (err: any) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.hotelUseCases.delete(req.params.id)
      res.status(200).json("Hotel has been deleted.")
    } catch (err: any) {
      next(err)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotel = await this.hotelUseCases.findById(req.params.id)
      res.json(hotel)
    } catch (err: any) {
      next(err)
    }
  }

  findMany = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req
    try {
      const hotels = await this.hotelUseCases.find(query)
      res.json(hotels)
    } catch (err) {
      next(err)
    }
  }

  findHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await this.hotelUseCases.findHotelRooms(req.params.id)
      res.json(rooms)
    } catch (err) {
      next(err)
    }
  }

}