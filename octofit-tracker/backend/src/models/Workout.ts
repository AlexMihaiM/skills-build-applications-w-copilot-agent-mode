import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Cardio', 'Strength', 'Mobility', 'Recovery', 'Team Challenge'],
      trim: true
    },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    durationMinutes: { type: Number, required: true, min: 10 },
    description: { type: String, required: true, trim: true },
    targetMuscles: [{ type: String, trim: true }]
  },
  { timestamps: true }
)

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>
export const Workout = mongoose.model('Workout', workoutSchema)
