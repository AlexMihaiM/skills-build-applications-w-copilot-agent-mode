import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    captain: { type: String, required: true, trim: true },
    members: [{ type: String, trim: true }],
    points: { type: Number, default: 0 },
    color: { type: String, default: '#4f46e5' }
  },
  { timestamps: true }
)

export type TeamDocument = InferSchemaType<typeof teamSchema>
export const Team = mongoose.model('Team', teamSchema)
