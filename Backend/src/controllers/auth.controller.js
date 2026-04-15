const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
  // logic to be implemeted yet
  if (!email) return false;
  return true;
}

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing Data!" });
    }
    if (name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (password.trim() === "" || password.length < 8) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }
    const userExists = await userModel.findOne({ email: email });
    if (userExists)
      return res
        .status(409)
        .json({ message: "This email is already linked to other user." });

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const user = await userModel.findOne({ email: email });
    if (user === null) {
      return res.status(401).json({ message: "User not found!" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.status(200).json({
      message: "Logged In Successfully!",
      data: { name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function currentUser(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: verify.id });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({
      message: "User found",
      data: { name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerUser, login, logout, currentUser };
