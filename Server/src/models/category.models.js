import sequelize from "../db/db.js";
import Sequelize from "sequelize";

const Category = sequelize.define(
  "category",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    slug : {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;
