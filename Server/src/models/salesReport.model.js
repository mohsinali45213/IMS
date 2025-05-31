import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const SalesReport = sequelize.define(
  "sales_report",
  {
    id: {
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,    
    },
  },
  { tableName: "sales_reports", timestamps: true }
);

export default SalesReport;
