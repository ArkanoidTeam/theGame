import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Message } from './Message'

@Table
export class Reaction extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @ForeignKey(() => Message)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare message_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare emoji: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare user_login: string

  @BelongsTo(() => Message)
  declare message: Message
}
