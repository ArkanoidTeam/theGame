import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const { APP_API_KEY } = process.env
const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization')
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, APP_API_KEY as string)
    console.log(token)
    console.log(APP_API_KEY)
    console.log(decoded)
    // req.user = decoded as { id: number };
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
  return
}

export default auth
