import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Topic } from './Topic'

@Table
export class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare topic_id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare parent_id: number

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

  @BelongsTo(() => Topic)
  declare topic: Topic
}
