import express from "express";
import {
  createProductSize,
  getAllProductSizes,
  getProductSizeById,
  updateProductSize,
  deleteProductSize,
} from "../controllers/productSize.controllers.js";

import { Router } from "express";
const proSizeRoutes = Router();

proSizeRoutes.post("/", createProductSize);
proSizeRoutes.get("/", getAllProductSizes);
proSizeRoutes.get("/:id", getProductSizeById);
proSizeRoutes.put("/:id", updateProductSize);
proSizeRoutes.delete("/:id", deleteProductSize);

export default proSizeRoutes;
