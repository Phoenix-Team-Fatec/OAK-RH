import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connectionDB';
import Equipe_user from './equipe_userModel';

class Equipe extends Model {
  public id!: number;
  public id_admin!: number;
  public nome!: string;
}

Equipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin', // Nome da tabela referenciada
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'equipe',
    timestamps: false,
  }
);

// Associações

Equipe.hasMany(Equipe_user, { foreignKey: 'equipe_id', as: 'users', onDelete: 'CASCADE' });





export default Equipe;
