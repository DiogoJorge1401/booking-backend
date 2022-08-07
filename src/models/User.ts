import mongoose, { Schema } from 'mongoose';

export interface UserI {
  username: string
  email: string
  password: string
  isAdmin?: boolean
}

const UserSchema = new Schema<UserI>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema)

export { UserModel };
