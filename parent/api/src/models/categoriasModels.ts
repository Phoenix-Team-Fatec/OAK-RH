// models/categoriasModels.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';

class Categoria extends Model {
  public id!: number;
  public nome!: string;
  public id_admin!: number;
}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id',
      },
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
