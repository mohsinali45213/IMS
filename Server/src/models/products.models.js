// import sequelize from "../db/db.js";
// import { DataTypes } from "sequelize";

// const Product = sequelize.define(
//   "product",
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     slug: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//     brandId: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },
//     categoryId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     subCategoryId: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },
//     image: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//   },
//   { tableName: "products", timestamps: true }
// );

// // Associations
// Product.associate = (models) => {
//   Product.belongsTo(models.Category, {
//     foreignKey: "categoryId",
//     as: "category",
//   });
//   Product.belongsTo(models.Brand, {
//     foreignKey: "brandId",
//     as: "brand",
//   });
//   Product.belongsTo(models.SubCategory, {
//     foreignKey: "subCategoryId",
//     as: "subCategory",
//   });
//   Product.hasMany(models.ProductSize, {
//     foreignKey: "productId",
//     as: "sizes",
//   });
// };

// export default Product;


import { Model, DataTypes } from "sequelize";
import sequelize from "../db/db.js";

class Product extends Model {
  static associate(models) {
    // Product.belongsTo(models.Category, {
    //   foreignKey: "categoryId",
    //   as: "category",
    // });
    Product.belongsTo(models.Brand, {
      foreignKey: "brandId",
      as: "brand",
    });
    Product.belongsTo(models.SubCategory, {
      foreignKey: "subCategoryId",
      as: "subCategory",
    });
    Product.hasMany(models.ProductSize, {
      foreignKey: "productId",
      as: "sizes",
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    // categoryId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    subCategoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
