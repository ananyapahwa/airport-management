const userModel = require('../models/user');

// Controller function to handle user creation
async function createUser(req, res) {
  const { username, email } = req.body;

  // Validation check
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required.' });
  }

  try {
    const userId = await userModel.createUser(username, email);
    res.status(201).json({ message: 'User created successfully', id: userId });
  } catch (err) {
    console.error("Error in createUser controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting user data.' });
  }
}

module.exports = { createUser };
