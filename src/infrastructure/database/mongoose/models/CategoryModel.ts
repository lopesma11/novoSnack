import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model("Category", categorySchema);
