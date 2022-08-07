import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { HttpError } from './error';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token
  if (!token) return next(new HttpError(401, "You are not authenticated!"))
  const JWT_SECRET = process.env.JWT_SECRET as string;
  try {
    const validToken = verify(token, JWT_SECRET) as any
    req.user = { id: validToken.id, isAdmin: validToken.isAdmin }
    next()
  } catch (error) {
    return next(new HttpError(401, "Token is not valid!"))
  }
}

export const verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id === req.params.id || req.user.isAdmin)
    return next()
  next(new HttpError(403, "You are not authorized!"))
}

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.isAdmin) return next()
  next(new HttpError(403, "You are not authorized!"))
}