import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../syncDatabase'
import User from './User'

class RefreshToken extends Model {
  public id!: number
  public token!: string
  public userId!: number
  public expiryDate!: Date
}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RefreshToken',
  }
)

RefreshToken.belongsTo(User, { foreignKey: 'userId' })

export default RefreshToken
