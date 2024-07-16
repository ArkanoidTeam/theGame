import express from 'express'
const router = express.Router()
import { register, login, refreshToken } from '../controllers/authControllers'

router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)

export default router