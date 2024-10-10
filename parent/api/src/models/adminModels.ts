
import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connectionDB";
import User from "./userModels";
import Equipe from "./equipeModels";


class Admin extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public empresa!: string;
  public cnpj!: string;


}



Admin.init(
    {

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        empresa:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
},
        {
            sequelize,
            tableName: "admin",
            timestamps: false
        }

);

User.belongsTo(Admin, { foreignKey: 'id_admin', as: 'admin', onDelete: 'CASCADE' });
Equipe.belongsTo(Admin, { foreignKey: 'id_admin', as: 'admin', onDelete: 'CASCADE' });

Admin.hasMany(User, { foreignKey: 'id_admin', as: 'users' ,onDelete: 'CASCADE' });
Admin.hasMany(Equipe, { foreignKey: 'id_admin', as: 'equipes', onDelete: 'CASCADE' });


export default Admin;