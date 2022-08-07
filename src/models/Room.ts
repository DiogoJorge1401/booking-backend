import mongoose, { Schema } from 'mongoose';

export interface RoomI {
  title: string
  price: number
  maxPeople: number
  description: string
  roomNumbers?: { number: number }[]
}

const RoomSchema = new Schema<RoomI>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  description: { type: String, required: true },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
}, { timestamps: true })

const RoomModel = mongoose.model('Room', RoomSchema)

export { RoomModel };
