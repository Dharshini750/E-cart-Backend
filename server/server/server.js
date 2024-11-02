const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dbConn = require('./config/db')
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require ('./routes/userRoutes')
const User = require('./models/userModels'); 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json("Welcome")
})
app.use('/products', productRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/api/users', userRoutes);


app.get('/api/user-details', async (req, res) => {
    try {
      const userId = req.query.userId; 
      const user = await User.findById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in : ${PORT}`)
})

