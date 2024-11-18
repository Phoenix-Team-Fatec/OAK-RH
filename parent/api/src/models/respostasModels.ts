import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';
class Resposta extends Model {
  public id!: number;
  public formulario_id!: number;
  public pergunta_id!: number;
  public respondido_por!: number;
  public equipe_id!: number;
  public resposta!: string | string[];
  public tipo_resposta!: string;
  public respondido_em!: Date;
}
Resposta.init(
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
        model: 'perguntas',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    pergunta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    respondido_por: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
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
    resposta: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    tipo_resposta: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    respondido_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    answered_for: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Resposta',
    tableName: 'respostas',
    timestamps: false,
  }
);
export default Resposta;