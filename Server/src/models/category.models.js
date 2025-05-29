// import { DataTypes ,Model} from "sequelize";
// import sequelize from "../db/db.js";
// const Category = sequelize.define(
//   "category",
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//     slug: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//     status: {
//       type: DataTypes.ENUM("active", "inactive"),
//       allowNull: false,
//       defaultValue: "active",
//     },
//   },
//   { tableName: "categories", timestamps: true }
// );

// // Associations
// Category.associate = (models) => {
//   Category.hasMany(models.Product, {
//     foreignKey: "categoryId",
//     as: "products",
//   });
//   Category.hasMany(models.SubCategory, {
//     foreignKey: "categoryId",
//     as: "subCategories",
//   });
// };

// export default Category;

// create using sql database
import { Model, DataTypes } from "sequelize";
import sequelize from "../db/db.js";

class Category extends Model {
  static associate(models) {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });

    Category.hasMany(models.SubCategory, {
      foreignKey: "categoryId",
      as: "subCategories",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;


