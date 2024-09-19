import { DataTypes, Model } from "sequelize";
import sequelize from '../database/connectionDB';

class Equipe extends Model{
    public id!: number;
    public nome!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Equipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    },
    {
        sequelize,
        tableName: 'equipe',
        timestamps: true,
    }
);