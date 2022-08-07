import { Router } from 'express';
import { HotelController } from '../controllers/hotelController';
import { verifyAdmin, verifyToken } from '../utils/verifyCookie';

const hotels = Router();

const hotelController = new HotelController()

hotels.get('/:id', hotelController.findOne)
hotels.get('/', hotelController.findMany)

hotels.use(verifyToken)
hotels.get('/room/:id', hotelController.findHotelRooms)

hotels.use(verifyAdmin)
hotels.post('/', hotelController.create)
hotels.put('/:id', hotelController.update)
hotels.delete('/:id', hotelController.delete)


export { hotels };
