import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './models/Topic'
import { Message } from './models/Message'
import { Reaction } from './models/Reaction'
import { apiUserInit } from './apiUserInit'
import { SiteTheme } from './models/Theme'
const {
  POSTGRES_URI,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_URI,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Topic, Message, SiteTheme, Reaction],
}

const sequelize = new Sequelize(sequelizeOptions)

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to synchronize the database:', error)
  } finally {
    apiUserInit()
  }
}

export { sequelize, syncDatabase, Topic, Message, Reaction }
