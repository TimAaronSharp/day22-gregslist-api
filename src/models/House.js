import { Schema } from "mongoose";


export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, min: 0, max: 30, required: true },
    bathrooms: { type: Number, min: 0, max: 25, required: true },
    levels: { type: Number, min: 1, max: 4, required: true },
    price: { type: Number, min: 0, max: 10000000, required: true },
    imgUrl: { type: String, min: 0, max: 500, required: true },
    description: { type: String, min: 0, max: 500, required: false },
    year: { type: Number, min: 1000, max: 2024, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)