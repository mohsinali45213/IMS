import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./db/db.js";
import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import brandRouter from "./routes/brand.routes.js";
import categoryRouter from "./routes/category.routes.js";
import subCategoryRouter from "./routes/subCategory.routes.js";
const app = express();
// .env configuration
dotenv.config({
  path: "../.env",
});
// connect db and run server
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application server is running at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);