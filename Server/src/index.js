// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import sequelize from "./db/db.js";
// import userRouter from "./routes/users.routes.js";
// import productRouter from "./routes/products.routes.js";
// import brandRouter from "./routes/brand.routes.js";
// import categoryRouter from "./routes/category.routes.js";
// import subCategoryRouter from "./routes/subCategory.routes.js";
// import proSizeRoutes from "./routes/productSize.routes.js";

// import SubCategory from './models/subCategory.modules.js';
// import Product from './models/products.models.js'; // Assuming you have a Product model
// import Category from "./models/category.models.js";
// import ProductSize from "./models/productsize.models.js";

// const app = express();
// // .env configuration
// dotenv.config({
//   path: "../.env",
// });
// // connect db and run server
// sequelize
//   .sync()
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(
//         `Application server is running at http://localhost:${process.env.PORT}`
//       );
//     });
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/brands", brandRouter);
// app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/subcategory", subCategoryRouter);
// app.use("/api/v1/product-size", proSizeRoutes);


// const db = {
//   sequelize,
//   Sequelize: sequelize.Sequelize,
//   Category,
//   SubCategory,
//   Product,
// };

// // Register associations after models are defined
// Object.values(db).forEach((model) => {
//   if (typeof model.associate === "function") {
//     model.associate(db);
//   }
// });

// export default db;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./models/index.js";
import models from "./models/index.js";

import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import brandRouter from "./routes/brand.routes.js";
import categoryRouter from "./routes/category.routes.js";
import subCategoryRouter from "./routes/subCategory.routes.js";
import proSizeRoutes from "./routes/productSize.routes.js";
import salesReport from "./models/salesReport.model.js";
dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/product-size", proSizeRoutes);
app.use("/api/v1/sales-report", salesReport);
// Start server after DB sync
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("DB Sync Error:", err.message);
});

export { sequelize, models };
export default app; // Export the app for testing or further configuration