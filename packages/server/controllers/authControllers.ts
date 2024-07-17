import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import RefreshToken from '../models/RefreshToken'
import { v4 as uuidv4 } from 'uuid'

const { APP_API_KEY } = process.env
const EXPIRY_DAYS = 7

const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, APP_API_KEY as string, { expiresIn: '15m' })
}

const generateRefreshToken = async (userId: number) => {
  const token = uuidv4()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS)

  await RefreshToken.create({
    token,
    userId,
    expiryDate,
  })

  return token
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    await User.create({ username, password })
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = await generateRefreshToken(user.id)
    res.json({ accessToken, refreshToken })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
  return
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(403).json({ message: 'Refresh token is required' })
    }

    const refreshToken = await RefreshToken.findOne({ where: { token } })
    if (!refreshToken || refreshToken.expiryDate < new Date()) {
      return res
        .status(403)
        .json({ message: 'Invalid or expired refresh token' })
    }

    const newAccessToken = generateAccessToken(refreshToken.userId)
    const newRefreshToken = await generateRefreshToken(refreshToken.userId)

    await refreshToken.destroy()

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
  return
}
