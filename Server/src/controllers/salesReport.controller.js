//create All controller functions for sales report
import SalesReport from "../models/salesReport.model.js";
import { Op } from "sequelize";   
// Import necessary models if needed
export const createSalesReport = async (req, res) => {
    try {
        const { productId, quantity, totalPrice, date } = req.body;
        const salesReport = await SalesReport.create({ productId, quantity, totalPrice, date });
        res.status(201).json(salesReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};          

export const getSalesReport = async (req, res) => { 

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
export const updateSalesReport = async (req, res) => {
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
export const deleteSalesReport = async (req, res) => {
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
export const getSalesReportById = async (req, res) => {
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
export const getSalesReportByProductId = async (req, res) => {
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
export const getSalesReportByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const salesReports = await SalesReport.findAll({ where: { date } });
        if (!salesReports.length) {
            return res.status(404).json({ message: "No sales reports found for this date" });
        }
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByQuantity = async (req, res) => {
    try {
        const { quantity } = req.params;
        const salesReports = await SalesReport.findAll({ where: { quantity } });
        if (!salesReports.length) {
            return res.status(404).json({ message: "No sales reports found for this quantity" });
        }
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByTotalPrice = async (req, res) => {
    try {
        const { totalPrice } = req.params;
        const salesReports = await SalesReport.findAll({ where: { totalPrice } });
        if (!salesReports.length) {
            return res.status(404).json({ message: "No sales reports found for this total price" });
        }
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndDate = async (req, res) => {
    try {
        const { productId, startDate, endDate } = req.query;
        const whereClause = {
            productId,
            date: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
        };

        const salesReports = await SalesReport.findAll({ where: whereClause });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                productId,
                quantity,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndTotalPrice = async (req, res) => {
    try {
        const { productId, totalPrice } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                productId,
                totalPrice,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByDateAndQuantity = async (req, res) => {
    try {
        const { startDate, endDate, quantity } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
                quantity,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByDateAndTotalPrice = async (req, res) => {
    try {
        const { startDate, endDate, totalPrice } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
                totalPrice,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByQuantityAndTotalPrice = async (req, res) => {
    try {
        const { quantity, totalPrice } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                quantity,
                totalPrice,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndDateAndQuantity = async (req, res) => {
    try {
        const { productId, startDate, endDate, quantity } = req.query;
        const whereClause = {
            productId,
            date: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
            quantity,
        };

        const salesReports = await SalesReport.findAll({ where: whereClause });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndDateAndTotalPrice = async (req, res) => {
    try {
        const { productId, startDate, endDate, totalPrice } = req.query;
        const whereClause = {
            productId,
            date: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
            totalPrice,
        };

        const salesReports = await SalesReport.findAll({ where: whereClause });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByProductAndQuantityAndTotalPrice = async (req, res) => {
    try {
        const { productId, quantity, totalPrice } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                productId,
                quantity,
                totalPrice,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSalesReportByDateAndQuantityAndTotalPrice = async (req, res) => {
    try {
        const { startDate, endDate, quantity, totalPrice } = req.query;
        const salesReports = await SalesReport.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
                quantity,
                totalPrice,
            },
        });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSalesReportByProductAndDateAndQuantityAndTotalPrice = async (req, res) => {
    try {
        const { productId, startDate, endDate, quantity, totalPrice } = req.query;
        const whereClause = {
            productId,
            date: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
            quantity,
            totalPrice,
        };

        const salesReports = await SalesReport.findAll({ where: whereClause });
        res.status(200).json(salesReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
