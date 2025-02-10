const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product'); 

const app = express();



app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Route to add a new product
app.post('/add-product', async (req, res) => {
    const { name, price, salePrice, brand, size, image, stock } = req.body;

    // Validate request data
    if (!name || !price || !brand) {
        return res.status(400).json({ message: 'Name, price, and brand are required!' });
    }

    try {
        // Create a new product instance
        const product = new Product({
            name,
            price,
            salePrice,
            brand,
            size,
            image,
            stock,
        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error saving product', error });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
