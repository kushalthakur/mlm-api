import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config'
import Member from './Member';

// These are all the attributes in the User model
export interface UserAttributes {
   id: number;
   firstName: string;
   lastName: string;
   username: string;
   email: string | null;
   phone: string | null;
   password: string | null;
   address: string | null;
   age: number | null;
   dateOfBirth: Date | null;
   role: string | null;
   status: number | null;
   createdAt?: string | Date;
   updatedAt?: string | Date;
}

class User extends Model implements UserAttributes {
   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
   public firstName!: string;
   public lastName!: string;
   public username!: string;
   public email!: string | null; // for nullable fields
   public phone!: string | null;
   public password!: string | null;
   public address!: string | null;
   public age!: number | null;
   public dateOfBirth!: Date | null;
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
   firstName: { type: new DataTypes.STRING(128), allowNull: false },
   lastName: { type: new DataTypes.STRING(128), allowNull: true },
   username: { type: new DataTypes.STRING(128), allowNull: false },
   email: { type: new DataTypes.STRING(128), allowNull: true },
   phone: { type: new DataTypes.STRING(56), allowNull: true },
   password: { type: new DataTypes.STRING(128), allowNull: true },
   address: { type: new DataTypes.TEXT, allowNull: true },
   age: { type: new DataTypes.INTEGER, allowNull: true },
   dateOfBirth: { type: new DataTypes.DATE, allowNull: true },
   role: { type: new DataTypes.STRING(56), allowNull: false },
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