import { Router } from 'express';
import { RoomController } from '../controllers/roomController';
import { verifyAdmin, verifyToken } from '../utils/verifyCookie';

const rooms = Router();

const roomController = new RoomController()

rooms.get('/:id', roomController.findOne)
rooms.get('/', roomController.findMany)

rooms.use(verifyToken)
rooms.put('/availability/:id', roomController.updateAvailability)

rooms.use(verifyAdmin)
rooms.post('/:hotelId', roomController.create)
rooms.put('/:id', roomController.update)
rooms.delete('/:id', roomController.delete)

export { rooms };