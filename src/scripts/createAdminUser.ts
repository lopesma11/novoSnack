import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserModel } from "../infrastructure/database/mongoose/models/UserModel";

const ADMIN = {
  userName: "admin_novo_snack",
  email: "admin_novo_snack@gmail.com",
  password: "senha123novo",
};

async function createAdminUser() {
  const mongoUri =
    process.env.MONGO_URI ?? "mongodb://localhost:27017/novoSnack";

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const existingUser = await UserModel.findOne({ email: ADMIN.email });

  if (existingUser) {
    console.log("Admin user already exists. Nothing created.");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN.password, 12);

  await UserModel.create({
    userName: ADMIN.userName,
    email: ADMIN.email,
    password: hashedPassword,
  });

  console.log(`Admin user created with email: ${ADMIN.email}`);
  await mongoose.disconnect();
}

createAdminUser().catch((err) => {
  console.error("Error creating admin:", err);
  process.exit(1);
});
