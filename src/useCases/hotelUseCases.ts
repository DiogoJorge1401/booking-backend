import { HotelI, HotelModel } from '../models/Hotel';


export class HotelUseCases {
  async create(hotelData: HotelI) {
    const savedHotel = HotelModel.create(hotelData)
    return savedHotel
  }

  async update(id: string, hotelData: HotelI) {
    return HotelModel.findByIdAndUpdate(id, { $set: hotelData }, { new: true })
  }

  async delete(id: string) {
    return HotelModel.findByIdAndRemove(id)
  }

  async findById(id: string) {
    return HotelModel.findById(id)
  }

  async find(query) {
    const { min, max, ...others } = query
    if (query.cities) return this.countByCity((query.cities))
    if (query.types) return this.countByType((query.types))
    return HotelModel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 1000 }
    }
    ).limit(query?.limit)
  }

  async findHotelRooms(id: string) {
    const hotel = await HotelModel.findById(id).populate('rooms')

    if (!hotel) return []

    return hotel.rooms
  }

  private countByCity = async (queryStr: string) => {
    const cities = queryStr.split(',')
    return Promise.all(cities.map((city) => HotelModel.countDocuments({ city })))
  }

  private countByType = async (queryStr: string) => {
    const types = queryStr.split(',')
    return Promise.all(
      types.map(async (type) => ({
        count: await HotelModel.countDocuments({ type }),
        type
      }))
    )
  }
}