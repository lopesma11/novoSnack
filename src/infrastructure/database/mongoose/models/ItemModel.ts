import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: true },
);

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemIngredients: { type: [ingredientSchema], default: [] },
    itemCategory: { type: String, required: true },
    imagePath: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ItemModel = mongoose.model("Item", itemSchema);
