import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  bookId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const CartModel = mongoose.model("Cart", cartSchema);
