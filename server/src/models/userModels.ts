// TypeScript
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
import bcrypt from 'bcrypt';




class User extends Model {
 
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public is_admin!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.senha);
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
  }
);

export default User;