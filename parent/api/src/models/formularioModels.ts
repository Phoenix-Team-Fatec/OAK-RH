import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';

class Formulario extends Model {
  public id!: number;
  public nome!: string;
  public descricao: string;
  public criado_em!: Date;
}

Formulario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Formulario',
    tableName: 'formularios',
    timestamps: false,
  }
);

export default Formulario;