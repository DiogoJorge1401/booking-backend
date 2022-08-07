import { HotelModel } from '../models/Hotel';
import { RoomI, RoomModel } from '../models/Room';
import { HttpError } from '../utils/error';

export class RoomUseCases {
  async create(hotelId: string, data: RoomI) {
    const hotel = await HotelModel.findById(hotelId)
    if (!hotel) throw new HttpError(400, "Hotel doesn't exist")
    const room = await RoomModel.create(data)
    await hotel.update({ $push: { rooms: room._id } })
    return room
  }

  async update(id: string, roomData: RoomI) {
    return RoomModel.findByIdAndUpdate(id, { $set: roomData }, { new: true })
  }

  async updateAvailability(id: string, roomDate: any) {
    return RoomModel
      .updateOne(
        { "roomNumbers._id": id },
        { $push: { "roomNumbers.$.unavailableDates": roomDate.dates } }
      )
  }

  async delete(id: string) {
    await RoomModel.findByIdAndRemove(id)
    await HotelModel.findOneAndUpdate({ rooms: id }, { $pull: { rooms: id } })
  }

  async findById(id: string) {
    return RoomModel.findById(id)
  }

  async find() {
    return RoomModel.find()
  }
}