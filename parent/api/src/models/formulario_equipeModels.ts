import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';

class Formulario_equipe extends Model {
  public id!: number;
  public nivel!: string;
  public formulario_id!: number;
  public equipe_id!: number;
}
Formulario_equipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    formulario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formularios',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    equipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipe',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Formulario_equipe',
    tableName: 'formulario_equipe',
    timestamps: false,
  }
);




export default Formulario_equipe;