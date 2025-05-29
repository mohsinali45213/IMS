import express from 'express';
import { createSalesReport,getSalesReport,updateSalesReport } from '../controllers/salesReport.controller.js';
import { Router } from 'express'; 

const salesRouter = Router();

salesRouter.get('/', getSalesReport);
salesRouter.post('/', createSalesReport);
salesRouter.put('/:id', updateSalesReport);

export default salesRouter;