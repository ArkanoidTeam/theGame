import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
import { createClientAndConnect } from './db'
import baseRoutes from './routes/baseRoutes'
import forumRoutes from './routes/forumRoutes'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.use('/', baseRoutes)
app.use('/api/forum', forumRoutes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
