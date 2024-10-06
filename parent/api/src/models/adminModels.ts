
import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connectionDB";
import User from "./userModels";
import bcrypt from 'bcrypt';


class Admin extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public empresa!: string;
  public cnpj!: string;


  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.senha);
  }


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
        senha:{
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
            allowNull: false
        },
},
        {
            sequelize,
            tableName: "admin",
            timestamps: false
        }

);

User.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin', onDelete: 'CASCADE' });
Admin.hasMany(User, { foreignKey: 'admin_id', as: 'users' ,onDelete: 'CASCADE' });


export default Admin;