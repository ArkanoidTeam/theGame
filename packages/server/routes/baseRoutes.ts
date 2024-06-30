import express from 'express'
const router = express.Router()

router.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

export default router
