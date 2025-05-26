import Sequelize from "sequelize";
import sequelize from "../db/db.js";
import Category from "./category.models.js"; // ✅ Import the related model

const SubCategory = sequelize.define(
  "sub_category",
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
    categoryId: { // ✅ FK to Category.id
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "categories", // Must match table name of Category
        key: "id",
      },
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "sub_categories",
    timestamps: true,
  }
);

// ✅ Setup associations properly
SubCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "categoryDetails",
});

Category.hasMany(SubCategory, {
  foreignKey: "categoryId",
  as: "subCategories",
});

export default SubCategory;
