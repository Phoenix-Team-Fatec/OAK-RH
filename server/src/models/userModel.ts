import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connectionDB'

class User extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public is_admin!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
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
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Usuario',
    }
);

export default User;