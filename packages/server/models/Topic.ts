import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Message } from './Message'

@Table
export class Topic extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare text: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare user_login: string

  @HasMany(() => Message)
  declare messages: Message[]
}
