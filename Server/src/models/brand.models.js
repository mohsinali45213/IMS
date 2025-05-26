import sequelize from "../db/db.js"; 
import Sequelize from "sequelize";

const Brand = sequelize.define(
  "brand",
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
    slug: {
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
    tableName: "brands",
    timestamps: true,
  }
);

export default Brand;
