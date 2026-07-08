const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

exports.register = async (req, res) => {
  try {
    const { name, age, email, phone, password } = req.body
    const normalizedEmail = normalizeEmail(email)

    if (!name || !age || !normalizedEmail || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const exists = await User.findOne({ email: normalizedEmail })
    if (exists) return res.status(409).json({ message: 'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      age,
      email: normalizedEmail,
      phone,
      passwordHash,
      role: 'user'
    })

    return res.status(201).json({ message: 'User created', userId: user._id })
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err?.message })
  }
}

exports.login = async (req, res) => {
  console.log("========== LOGIN ==========");
  console.log("Request Body:", req.body);

  try {
    const { password } = req.body;
    const normalizedEmail = normalizeEmail(req.body.email);

    const user = await User.findOne({ email: normalizedEmail });

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    console.log("Password Match:", ok);

    if (!ok) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = signToken(user);

    console.log("Login Success");

    return res.json({
      message: "Login Successful",
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Login failed",
      error: err.message
    });
  }
};

