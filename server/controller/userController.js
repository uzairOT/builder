const asyncHandler = require('express-async-handler');

const generateToken =require('../utils/generateToken');
const pool = require("../db")
const { User } = require('../models');
const bcrypt = require('bcrypt');



const loginUser = asyncHandler(async (req, res) => {
  const userCredentials = req.body;

  const userEmail = userCredentials.email;
  const userPassword = userCredentials.password;

  // Find the user by email
  const user = await User.findOne({ where: { email: userEmail } });

  if (!user) {
    // User not found
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  // Compare passwords
  const isPasswordMatch = await bcrypt.compare(userPassword, user.password);

  if (isPasswordMatch) {
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      // Add other fields you want to include
    };
    // Passwords match, login successful
    res.status(200).json({ message: 'Login successful', user:userResponse });
  } else {
    // Passwords do not match
    res.status(401).json({ message: 'Invalid email or password' });
  }
});




const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const userExists = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows.length > 0;
};



const logoutUser = asyncHandler(async (req, res) => {
  // Implementation for user logout
  res.status(200).json({ message: 'User logged out successfully' });
});

const getUserProfile = asyncHandler(async (req, res) => {
  // Implementation for getting user profile
  res.status(200).json({ message: 'User profile fetched successfully' });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // Implementation for updating user profile
  res.status(200).json({ message: 'User profile updated successfully' });
});

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};









