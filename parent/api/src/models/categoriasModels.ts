import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
// npx sequelize-cli db:migrate:undo
class Categoria extends Model {
  public id!: number;
  public nome!: string;
}
Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false,
  }
);
export default Categoria;