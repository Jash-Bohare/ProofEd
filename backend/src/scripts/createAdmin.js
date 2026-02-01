import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";
import path from "path";
import { fileURLToPath } from "url";


// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const username = "admin";
  const email = "admin@proofed.com";
  const plainPassword = "admin123";

  const existing = await Admin.findOne({
    $or: [{ email }, { username }],
  });

  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Admin.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("✅ Admin created successfully");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", plainPassword);

  process.exit(0);
};

createAdmin();
