import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

// Create a new product
router.post("/products", authMiddleware, createProduct);

// Read all products
router.get("/products", getAllProducts);

// Update a product
router.put("/products/:id", authMiddleware, updateProduct);

// Delete a product
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
