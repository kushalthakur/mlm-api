import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config'

// These are all the attributes in the Member model
interface MemberAttributes {
   id: number
   userId: number
   parentId: number
   depth: number
   status: number | null
}

class Member extends Model implements MemberAttributes {
   public id!: number // Note that the `null assertion` `!` is required in strict mode.
   public userId!: number
   public parentId!: number
   public depth!: number
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
   parentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
   depth: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
   status: { type: new DataTypes.INTEGER, defaultValue: 1 }
}, {
   tableName: "members",
   sequelize
})

export default Member