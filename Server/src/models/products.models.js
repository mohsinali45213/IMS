// models/Product.js
import Sequelize from "sequelize";
import sequelize from "../db/db.js";
import Category from "./category.models.js";
import SubCategory from "./subCategory.modules.js";
import Brand from "./brand.models.js";

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    brandId: {
      type: Sequelize.UUID, // ✅ use UUID here
      allowNull: true,
    },
    categoryId: {
      type: Sequelize.UUID, // ✅ REQUIRED
      allowNull: false,
    },
    subCategoryId: {
      type: Sequelize.UUID, // ✅ REQUIRED if you're using subcategories
      allowNull: true,
    },
    barcode: {
      type: Sequelize.STRING(50),
      allowNull: true,
      unique: true,
    },
    itemCode: {
      type: Sequelize.STRING(50),
      allowNull: true,
      unique: true,
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

const ProductSize = sequelize.define(
  "product_size",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    size: {
      type: Sequelize.ENUM("XS", "S", "M", "L", "XL", "XXL"),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_sizes",
    timestamps: true,
  }
);

// Associations
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });

Product.belongsTo(SubCategory, {
  foreignKey: "subCategoryId",
  as: "subCategory",
});
SubCategory.hasMany(Product, { foreignKey: "subCategoryId", as: "products" });

Product.hasMany(ProductSize, { foreignKey: "productId", as: "sizes" });
ProductSize.belongsTo(Product, { foreignKey: "productId", as: "product" });

Product.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
Brand.hasMany(Product, { foreignKey: "brandId", as: "products" });

export { Product, ProductSize };
