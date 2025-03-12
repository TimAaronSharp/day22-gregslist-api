import { Schema } from "mongoose";


export const PetSchema = new Schema(
  {
    name: { type: String, minLength: 1, maxLength: 100, required: true },
    imgUrl: { type: String, minLength: 1, maxLength: 1000 },
    age: { type: Number, min: 0, max: 5000, required: true },
    likes: [{ type: String, minLength: 1, maxLength: 1000, required: true }],
    isVaccinated: { type: Boolean, required: true },
    status: { type: String, enum: ['adopted', 'adoptable'], required: true },
    species: { type: String, enum: ['cat', 'dog', 'bird', 'capybara'], required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

PetSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})