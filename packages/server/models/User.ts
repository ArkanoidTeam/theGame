import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../syncDatabase'
import bcrypt from 'bcryptjs'
import { AllowNull, Column, ForeignKey } from 'sequelize-typescript'
import { SiteTheme } from './Theme'

class User extends Model {
  public id!: number
  public username!: string
  public password!: string

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare themeId: number

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
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SiteThemes',
        key: 'id',
      },
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

User.belongsTo(SiteTheme, {
  foreignKey: 'themeId',
  as: 'theme',
})

export default User
