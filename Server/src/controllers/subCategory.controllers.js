import SubCategory from "../models/subCategory.modules.js";
import Category from "../models/category.models.js";
import { Op } from "sequelize";

const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : undefined;

    // Check if sub-category already exists
    const existingSubCategory = await SubCategory.findOne({
      where: { slug: slug },
    });
    if (existingSubCategory) {
      return res.status(400).json({ message: "Sub-category already exists" });
    }

    const newSubCategory = await SubCategory.create({
      name,
      slug,
      categoryId,
    });
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error("Error creating sub-category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({
      include: [
        {
          model: Category,
          as: "categoryDetails",
          attributes: ["id", "name", "slug"],
        },
      ],
    });
    res.status(200).json(subCategories);
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id, {
      include: [
        {
          model: Category,
          as: "categoryDetails",
          attributes: ["id", "name", "slug"],
        },
      ],
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    console.error("Error fetching sub-category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : undefined;
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // Check if slug already exists for another sub-category
    const existingSubCategory = await SubCategory.findOne({
      where: {
        slug: slug,
        id: { [Op.ne]: id }, // Exclude current sub-category
      },
    });
    if (existingSubCategory) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    subCategory.name = name || subCategory.name;
    subCategory.slug = slug || subCategory.slug;
    subCategory.categoryId = categoryId || subCategory.categoryId;

    await subCategory.save();
    res.status(200).json(subCategory);
  } catch (error) {
    console.error("Error updating sub-category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    await subCategory.destroy();
    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub-category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};  

export {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
}