import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../syncDatabase'
import bcrypt from 'bcryptjs'

class User extends Model {
  public id!: number
  public username!: string
  public password!: string

  public async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      },
    },
  }
)

export default User
