import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  SKU: String,
  quantity: Number,
  productName: String,
  image: String,
  productDescription: String,
  isFav: { type: Boolean, default: false },
  // Add a reference to the user who created the product
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
