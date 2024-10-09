const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Add Product
router.post('/addProduct', async (req, res) => {
  const { name, price, salePrice, brand, size, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      brand,
      price,
      salePrice,
      size,
      stock
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const fetchproducts = await Product.find()
    res.status(200).json(fetchproducts)
  } catch (error) {
    res.status(500).json(error)
  }
})
// Edit Product
router.put('/editProduct/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, salePrice, brand, size, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, salePrice, brand, size, stock },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/deleteProduct/:id', async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
