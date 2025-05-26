import Category from "../models/category.models.js";
import SubCategory from "../models/subCategory.modules.js";
import { Op } from "sequelize";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    // Check if category already exists
    const existingCategory = await Category.findOne({
      where: { slug: slug },
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ name, slug });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: SubCategory,
          as: "subCategories",
          attributes: ["id", "name", "slug", "status"],
        },
      ],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        {
          model: SubCategory,
          as: "subCategories",
          attributes: ["id", "name", "slug", "status"],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : undefined;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if slug already exists for another category
    const existingCategory = await Category.findOne({
      where: { slug, id: { [Op.ne]: id } },
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchCategories = async (req, res) => {
  try {
    const { query } = req.query;
    const categories = await Category.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`, // Case-insensitive search
        },
      },
      include: [
        {
          model: SubCategory,
          as: "subCategories",
          attributes: ["id", "name", "slug", "status"],
        },
      ],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error searching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};  

export{
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategories
}