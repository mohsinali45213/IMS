import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const ProductSize = sequelize.define(
  "product_size",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL"),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    itemCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "product_sizes", timestamps: true }
);

// Associations
ProductSize.associate = (models) => {
  ProductSize.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
};
export default ProductSize;
