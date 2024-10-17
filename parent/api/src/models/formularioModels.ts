import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
import Formulario_equipe from './formulario_equipeModels';


class Formulario extends Model {
  public id!: number;
  public nome!: string;
  public descricao: string;
  public criado_em!: Date;
  public admin_id!: number;
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
    admin_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'admin',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  },
  {
    sequelize,
    modelName: 'Formulario',
    tableName: 'formularios',
    timestamps: false,
  }
);


Formulario_equipe.belongsTo(Formulario, { foreignKey: 'formulario_id', as: 'formularios', onDelete: 'CASCADE' });


export default Formulario;