import { Table, Column, Model, DataType, Index } from 'sequelize-typescript'

@Table
export class SiteTheme extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare theme: string
}
