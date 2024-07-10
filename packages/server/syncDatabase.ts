import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './models/Topic'
import { Message } from './models/Message'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Topic, Message],
}

const sequelize = new Sequelize(sequelizeOptions)

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to synchronize the database:', error)
  }
}

export { sequelize, syncDatabase, Topic, Message }
