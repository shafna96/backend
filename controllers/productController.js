import Product from "../models/product.js";

// Create a new product
export const addProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image: req.file ? req.file.filename : "", // Set the image field if a file is uploaded
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Update a product

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { isFav, ...productData } = req.body;

  try {
    // Find the product in the database
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    Object.assign(product, productData);

    // Update the image field if a file is uploaded
    if (req.file) {
      product.image = req.file.filename;
    }

    // If isFav is provided, update the favorite status
    if (isFav !== undefined) {
      // Toggle the isFav status
      product.isFav = isFav;
    }

    // Save the updated product
    await product.save();

    // Respond with the updated product and isFav status separately
    res.status(200).json({
      success: true,
      message: "Product and favorite status updated successfully",
      product,
      isFav: product.isFav,
    });
  } catch (error) {
    console.error("Error updating product and favorite status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Ensure you are getting the product from the database correctly
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIsFavProd = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFav } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isFav = isFav;
    await product.save();

    res.status(200).json({ isFav: product.isFav });
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
