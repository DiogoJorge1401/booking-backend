import { UserI, UserModel } from '../models/User'

export class UserUseCases {
  async update(id: string, userData: UserI) {
    return UserModel.findByIdAndUpdate(id, { $set: userData }, { new: true })
  }

  async delete(id: string) {
    return UserModel.findByIdAndRemove(id)
  }

  async findById(id: string) {
    return UserModel.findById(id).select({ password: false, isAdmin: false })
  }

  async find() {
    return UserModel.find().select({ password: false, isAdmin: false })
  }
}