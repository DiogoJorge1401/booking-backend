import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserI, UserModel } from '../models/User';
import { HttpError } from '../utils/error';

export class AuthUseCases {
  async register(data: UserI) {
    const hashedPassword = await hash(data.password, 10)
    await UserModel.create({ ...data, password: hashedPassword })
  }

  async login(data: Pick<UserI, 'username' | 'password'>) {
    const user = await UserModel.findOne({ username: data.username });

    if (!user) throw new HttpError(400, "Incorrect username or password");

    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect) throw new HttpError(400, "Incorrect username or password");

    const token = sign(
      { id: user._id, isAdmin: user.isAdmin },
      (process.env.JWT_SECRET as string)
    );

    const { password, ...otherDetails } = user.toObject();

    return { token, data: otherDetails }
  }
}