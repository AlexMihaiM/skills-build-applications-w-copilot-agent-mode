import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    team: { type: String, trim: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, min: 1 }
  },
  { timestamps: true }
)

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
