import mongoose, { Schema } from 'mongoose';

export interface HotelI {
  name: string
  type: string
  city: string
  address: string
  distance: string
  photos?: string[]
  description: string
  title: string
  rating?: number
  rooms: string[]
  cheapestPrice: number
  featured?: boolean
}


const HotelSchema = new Schema<HotelI>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: [String] },
  description: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  cheapestPrice: { type: Number, required: true },
  featured: { type: Boolean, default: false },
})

const HotelModel = mongoose.model('Hotel', HotelSchema)

export { HotelModel };
