import { DataTypes, Model } from "sequelize";
import sequelize from '../database/connectionDB'
import Equipe from "./equipeModels";
import Formulario from "./formularioModels";
import User from "./userModels";

class Formulario_user extends Model {
    public id!: number
    public formulario_id!: number
    public user_id!: number
    public status!: string;
    public respondido_em!: Date;
  
}

Formulario_user.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        formulario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'formularios',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendente'
        },
        respondido_em: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'Formulario_user',
        tableName: 'formulario_user',
        timestamps: false
    }
)

//associações de tabela
Formulario_user.belongsTo(User, {foreignKey: 'user_id', as: 'users', onDelete: 'CASCADE'})
Formulario_user.belongsTo(Formulario, {foreignKey: 'formulario_id', as: 'form', onDelete: 'CASCADE'})

User.hasMany(Formulario_user, {foreignKey: 'user_id', as: 'users', onDelete: 'CASCADE'})
Formulario.hasMany(Formulario_user, {foreignKey: 'formulario_id', as: 'form', onDelete: 'CASCADE'})

export default Formulario_user