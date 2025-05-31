//create All controller functions for sales report
import SalesReport from "../models/salesReport.model.js";
import { Op } from "sequelize";   
// Import necessary models if needed
const createSalesReport = async (req, res) => {
    try {
        const { productId, quantity, totalPrice, date } = req.body;
        const salesReport = await SalesReport.create({ productId, quantity, totalPrice, date });
        res.status(201).json(salesReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};          

const getSalesReport = async (req, res) => { 

    try {
        const { startDate, endDate } = req.query;
        const whereClause = {};

        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        const salesReports = await SalesReport.findAll({ where: whereClause });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateSalesReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity, totalPrice, date } = req.body;

        const salesReport = await SalesReport.findByPk(id);
        if (!salesReport) {
            return res.status(404).json({ message: "Sales report not found" });
        }

        salesReport.productId = productId || salesReport.productId;
        salesReport.quantity = quantity || salesReport.quantity;
        salesReport.totalPrice = totalPrice || salesReport.totalPrice;
        salesReport.date = date || salesReport.date;

        await salesReport.save();
        res.status(200).json(salesReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
const deleteSalesReport = async (req, res) => {
    try {
        const { id } = req.params;
        const salesReport = await SalesReport.findByPk(id);
        if (!salesReport) {
            return res.status(404).json({ message: "Sales report not found" });
        }

        await salesReport.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSalesReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const salesReport = await SalesReport.findByPk(id);
        if (!salesReport) {
            return res.status(404).json({ message: "Sales report not found" });
        }
        res.status(200).json(salesReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSalesReportByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const salesReports = await SalesReport.findAll({ where: { productId } });
        if (!salesReports.length) {
            return res.status(404).json({ message: "No sales reports found for this product" });
        }
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createSalesReport,
    getSalesReport,
    updateSalesReport,
    deleteSalesReport,
    getSalesReportById,
    getSalesReportByProductId
};