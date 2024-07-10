import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
// import { createClientAndConnect } from './db'
import baseRoutes from './routes/baseRoutes'
import forumRoutes from './routes/forumRoutes'
import { syncDatabase } from './syncDatabase'
import bodyParser from 'body-parser'
import swaggerOptions from './swaggerConfig'

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()

syncDatabase()

app.use(swaggerOptions)

app.use('/', baseRoutes)
app.use('/api/forum', forumRoutes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
