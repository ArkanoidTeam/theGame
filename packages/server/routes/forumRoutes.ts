import express from 'express'
const router = express.Router()

router.get('/topics', (_, res) => {
  res.json('Данные получены!')
})

export default router
