import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
import User from './userModels';
import Equipe from './equipeModels';

class Equipe_user extends Model {
  public id!: number;
  public user_id!: number;
  public equipe_id!: number;
  public is_lider!: boolean;
}

Equipe_user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario', // Nome da tabela referenciada
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    equipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipe', // Nome da tabela referenciada
        key: 'id',
        
      },
      onDelete: 'CASCADE',
    },
    is_lider: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Equipe_user',
    tableName: 'equipe_user',
    timestamps: false,
  }
);


 

export default Equipe_user;
