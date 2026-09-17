import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['Running', 'Walking', 'Strength', 'Cycling', 'Yoga'],
      trim: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, min: 0 },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
)

export type ActivityDocument = InferSchemaType<typeof activitySchema>
export const Activity = mongoose.model('Activity', activitySchema)
