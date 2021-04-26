import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config'

// These are all the attributes in the Member model
export interface MemberAttributes {
   id: number
   userId: number | null
   parentId: number | null
   level: number | null
   sponsorId: string | null
   status: number | null
   createdAt?: string | Date
   updatedAt?: string | Date
}

class Member extends Model implements MemberAttributes {
   public id!: number // Note that the `null assertion` `!` is required in strict mode.
   public userId!: number | null
   public parentId!: number | null
   public level!: number | null
   public sponsorId!: string | null
   public status!: number | null;
   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
}

Member.init({
   id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
   },
   userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
   parentId: { type: DataTypes.INTEGER, allowNull: false },
   level: { type: DataTypes.INTEGER, allowNull: false },
   sponsorId: { type: DataTypes.STRING(128), allowNull: true },
   status: { type: new DataTypes.INTEGER, defaultValue: 1 }
}, {
   tableName: "members",
   sequelize
})

export default Member