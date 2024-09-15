const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (req, res) => {
  try {
    // const { fullName, username, password, phone, isAdmin } = req.body;
    const { fullName, username, password, phone } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      fullName,
      username,
      password, // Will be hashed automatically by the pre-save hook
      phone,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { fullName, username, password, phone, isAdmin } = req.body;

    // Find and update the user
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.phone = phone || user.phone;

    // Only hash the password if it was updated
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save(); // Save updated user

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Tạo JWT
    const token = jwt.sign(
      { userId: user._id }, // Không cần isAdmin nữa
      process.env.JWT_SECRET, // Khóa bí mật để tạo JWT
      { expiresIn: "1h" } // Token có thời hạn 1 giờ
    );

    const userSend = {
      username: user.username,
      fullName: user.fullName,
      phone: user.phone,
    };

    res.status(200).json({
      message: "Login successful",
      token, // Gửi token về cho người dùng
      user: { userSend }, // Trả về thông tin cơ bản của người dùng
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
};
