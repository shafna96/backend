import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";

/* CONFIGURATION */
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/api", productRoutes);

/* Serve static files from the 'uploads' directory */
app.use(
  "/uploads",
  (req, res, next) => {
    console.log("Request to /uploads:", req.url);
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
