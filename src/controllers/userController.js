const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Lấy người dùng theo ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Xóa người dùng theo ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password }, // Các trường cần cập nhật
      { new: true, runValidators: true } // Trả về bản ghi mới sau khi cập nhật và kiểm tra validation
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
