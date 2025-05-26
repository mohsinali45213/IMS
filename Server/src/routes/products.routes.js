import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  // sortProducts,
  updateProduct,
} from "../controllers/products.controllers.js";
import { Router } from "express";
const productRouter = Router();
productRouter.post("/", createProduct); 
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
// productRouter.get("/sort", sortProducts);
export default productRouter;