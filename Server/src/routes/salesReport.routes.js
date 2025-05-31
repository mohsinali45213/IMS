import {
  createSalesReport,
  deleteSalesReport,
  getSalesReport,
  getSalesReportById,
  getSalesReportByProductId,
  updateSalesReport,
} from "../controllers/salesReport.controller";

import { Router } from "express";
const saleRouter = Router();

saleRouter.post("/", createSalesReport);
saleRouter.get("/", getSalesReport);
saleRouter.get("/:id", getSalesReportById);
saleRouter.get("/product/:productId", getSalesReportByProductId);
saleRouter.put("/:id", updateSalesReport);
saleRouter.delete("/:id", deleteSalesReport);

export default saleRouter;