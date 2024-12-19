import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
  bookId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const FavoriteModel = mongoose.model("Favorite", favoriteSchema);
