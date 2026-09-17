import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 0 },
    grade: { type: String, trim: true },
    team: { type: String, trim: true },
    favoriteWorkout: { type: String, trim: true },
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export type UserDocument = InferSchemaType<typeof userSchema>
export const User = mongoose.model('User', userSchema)
