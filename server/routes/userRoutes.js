// const express = require('express');
// const router = express.Router();
// const { signupUser, loginUser } = require('../controllers/userController');


// router.post('/signup', signupUser);
// router.post('/login', loginUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const { signupUser, loginUser } = require('../controllers/userController');
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/save-address', async (req, res) => {
  try {
    const { name, email, phone, gender, address,password } = req.body;

    const user = new User({
      username: name,
      email,
      phone,
      password,
    });

    // Save the user document in MongoDB
    await user.save();
    res.status(200).json({ message: 'Address saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save address' });
  }
});

module.exports = router;
