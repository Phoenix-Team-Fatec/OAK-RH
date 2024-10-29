// TypeScript
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
import bcrypt from 'bcrypt';
import Equipe_user from './equipe_userModel';


class User extends Model {
 
  public id!: number;
  public nome!: string;
  public email!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    id_admin:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin', // Nome da tabela referenciada
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
    
  },
  {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
  }
);

Equipe_user.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });

User.hasMany(Equipe_user, { foreignKey: 'user_id', as: 'user' , onDelete: 'CASCADE' });

export default User;