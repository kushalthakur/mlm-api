import { Model, DataTypes, Association } from 'sequelize'
import { sequelize } from '../config'
import Member from './Member';

// These are all the attributes in the User model
interface UserAttributes {
   id: number;
   name: string;
   email: string | null;
   phone: string | null;
   password: string | null;
   role: string | null;
   status: number | null;
}

class User extends Model implements UserAttributes {
   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
   public name!: string;
   public email!: string | null; // for nullable fields
   public phone!: string | null;
   public password!: string | null;
   public role!: string | null;
   public status!: number | null;
   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
}

User.init({
   id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
   },
   name: { type: new DataTypes.STRING(128), allowNull: true },
   email: { type: new DataTypes.STRING(128), allowNull: true },
   phone: { type: new DataTypes.STRING(56), allowNull: true },
   password: { type: new DataTypes.STRING(128), allowNull: true },
   role: { type: new DataTypes.STRING(56), allowNull: true },
   status: { type: new DataTypes.INTEGER, defaultValue: 1 }
}, {
   tableName: "users",
   sequelize, // passing the `sequelize` instance is required
});

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Member, {
   sourceKey: "id",
   foreignKey: "userId",
   as: "members", // this determines the name in `associations`!
});

export default User