import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
//.env configuration
dotenv.config({
  path: "../.env",
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Database Connection call
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is Running at Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  });