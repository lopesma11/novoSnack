import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemIngredients: { type: [String], required: true },
    itemCategory: { type: String, required: true },
  },
  { timestamps: true },
);

export const ItemModel = mongoose.model("Item", itemSchema);
