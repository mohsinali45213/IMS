import Brand from "../models/brand.models.js";
import { Op } from "sequelize";

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    // Check if brand already exists
    const existingBrand = await Brand.findOne({
      where: { slug: slug },
    });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const newBrand = await Brand.create({ name, slug });
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if the new slug already exists
    if (slug) {
      const existingBrand = await Brand.findOne({
        where: { slug: slug, id: { [Op.ne]: id } },
      });
      if (existingBrand) {
        return res.status(400).json({ message: "Brand with this slug already exists" });
      }
    }

    await brand.update({ name, slug });
    res.status(200).json(brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await brand.destroy();
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
}