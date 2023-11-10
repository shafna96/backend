import express from "express";

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateIsFavProd,
  updateProduct,
  // updateProductFavoriteStatus,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = express.Router();

// Create a new product
router.post("/products", upload.single("image"), addProduct);

// Read all products
router.get("/products", getAllProducts);

// Get a product by ID
router.get("/products/:id", getProductById);

// Update a product
router.put("/products/:id", upload.single("image"), updateProduct);

// Delete a product
router.delete("/products/:id", deleteProduct);

router.put("/products/:productId/update-favorite", updateIsFavProd);

export default router;
