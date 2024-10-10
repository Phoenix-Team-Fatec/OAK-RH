import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connectionDB';

class Resposta extends Model {
  public id!: number;
  public pergunta_id!: number;
  public respondido_por!: number;
  public equipe_id!: number;
  public resposta!: string;
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
    pergunta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'perguntas',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    modelName: 'Resposta',
    tableName: 'respostas',
    timestamps: false,
  }
);

export default Resposta;
