import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

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

  res.status(201).json({
    status: "success",
    data: { id: user.id, name: user.name, email: user.email },
  });
};

export { register };
