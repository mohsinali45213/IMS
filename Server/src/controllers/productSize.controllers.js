import ProductSize from "../models/productsize.models.js";
import Product from "../models/products.models.js";
import slugify from "../utils/slugify.js";

// ✅ Create Product Size
export const createProductSize = async (req, res) => {
  try {
    const { productId, size, price, stock, itemCode,barcode } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const slug = slugify(`${product.name}-${size}`);

    const newSize = await ProductSize.create({
      productId,
      size,
      barcode,
      itemCode,
      slug,
      price,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product size created successfully",
      data: newSize,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product size",
      error: error.message,
    });
  }
};

// ✅ Get All Product Sizes
export const getAllProductSizes = async (req, res) => {
  try {
    const sizes = await ProductSize.findAll({
      include: [{ association: "product" }],
    });

    res.status(200).json({
      success: true,
      message: "Product sizes fetched successfully",
      data: sizes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product sizes",
      error: error.message,
    });
  }
};

// ✅ Get Product Size by ID
export const getProductSizeById = async (req, res) => {
  try {
    const { id } = req.params;

    const size = await ProductSize.findByPk(id, {
      include: [{ association: "product" }],
    });

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Product size not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product size fetched successfully",
      data: size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product size",
      error: error.message,
    });
  }
};

// ✅ Update Product Size
export const updateProductSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, size, price, stock } = req.body;

    const sizeRecord = await ProductSize.findByPk(id);
    if (!sizeRecord) {
      return res.status(404).json({ success: false, message: "Product size not found" });
    }

    const product = await Product.findByPk(productId || sizeRecord.productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const slug = slugify(`${product.name}-${size || sizeRecord.size}`);

    await sizeRecord.update({
      productId: productId || sizeRecord.productId,
      size: size || sizeRecord.size,
      slug,
      price: price ?? sizeRecord.price,
      stock: stock ?? sizeRecord.stock,
    });

    res.status(200).json({
      success: true,
      message: "Product size updated successfully",
      data: sizeRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product size",
      error: error.message,
    });
  }
};

// ✅ Delete Product Size
export const deleteProductSize = async (req, res) => {
  try {
    const { id } = req.params;

    const size = await ProductSize.findByPk(id);

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Product size not found",
      });
    }

    await size.destroy();

    res.status(200).json({
      success: true,
      message: "Product size deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product size",
      error: error.message,
    });
  }
};
