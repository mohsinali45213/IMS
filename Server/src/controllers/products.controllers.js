import { Product, ProductSize } from "../models/products.models.js";
import { Op } from "sequelize";

// ✅ Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      categoryId,
      subCategoryId,
      brandId,
      barcode,
      itemCode,
      image,
      sizes, // [{ size: "M", quantity: 10 }, { size: "L", quantity: 5 }]
    } = req.body;

    const slug = name.toLowerCase().replace(/ /g, "-");
    let stock = 0; // Default stock value
    if (sizes && Array.isArray(sizes)) {
      stock = sizes.reduce((total, size) => total + (size.quantity || 0), 0);
    }
    const newProduct = await Product.create({
      name,
      slug,
      price,
      stock,
      categoryId,
      subCategoryId,
      brandId,
      barcode,
      itemCode,
      image,
    });

    // Add associated sizes if provided
    if (sizes && Array.isArray(sizes)) {
      const sizeEntries = sizes.map((s) => ({
        productId: newProduct.id,
        size: s.size,
        quantity: s.quantity,
      }));
      await ProductSize.bulkCreate(sizeEntries);
    }

    const productWithAssociations = await Product.findByPk(newProduct.id, {
      include: ["category", "subCategory", "brand", "sizes"],
    });

    res.status(201).json(productWithAssociations);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get all products (with optional filtering)
export const getAllProducts = async (req, res) => {
  try {
    const { name, categoryId, brandId } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;

    const products = await Product.findAll({
      where,
      include: ["category", "subCategory", "brand", "sizes"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: ["category", "subCategory", "brand", "sizes"],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, "-");

    await product.update(req.body);

    // If sizes are passed for update
    if (req.body.sizes) {
      await ProductSize.destroy({ where: { productId: id } }); // Remove existing sizes
      const sizeEntries = req.body.sizes.map((s) => ({
        productId: id,
        size: s.size,
        quantity: s.quantity,
      }));
      await ProductSize.bulkCreate(sizeEntries);
    }

    const updatedProduct = await Product.findByPk(id, {
      include: ["category", "subCategory", "brand", "sizes"],
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await ProductSize.destroy({ where: { productId: id } }); // Remove sizes first
    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Sort products by price ,category, brand, and stock
export const sortProducts = async (req, res) => {
  try {
    const { sortBy, order = "ASC" } = req.query;

    const validSortFields = ["price", "categoryId", "brandId", "stock"];
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }

    const products = await Product.findAll({
      include: ["category", "subCategory", "brand", "sizes"],
      order: [[sortBy, order]],
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error sorting products:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
