import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user already exist
  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "User already exist with this email." });
  }

  // 2. Hash passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 4. Generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user email exist in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // 2. Verify Password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // 3. Generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};

export { register, login, logout };
