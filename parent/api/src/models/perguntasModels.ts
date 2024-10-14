import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
class Pergunta extends Model {
  public id!: number;
  public formulario_id!: number;
  public texto!: string;
  public descricao: string; // FAREMOS DESTA FORMA?
  public tipo!: string;
  public categoria_id!: number;
}
Pergunta.init(
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
    texto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descricao:{
        type: DataTypes.ARRAY,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Pergunta',
    tableName: 'perguntas',
    timestamps: false,
  }
);
export default Pergunta;