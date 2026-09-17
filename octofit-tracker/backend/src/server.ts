import express from 'express'
import type { Model } from 'mongoose'
import { connectToDatabase } from './config/database.js'
import { Activity } from './models/Activity.js'
import { Leaderboard } from './models/Leaderboard.js'
import { Team } from './models/Team.js'
import { User } from './models/User.js'
import { Workout } from './models/Workout.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', async (_request, response) => {
  const userCount = await User.countDocuments()

  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    apiBaseUrl,
    userCount
  })
})

const routeModels: Record<string, { path: string; model: Model<any> }> = {
  users: { path: '/api/users/', model: User },
  teams: { path: '/api/teams/', model: Team },
  activities: { path: '/api/activities/', model: Activity },
  leaderboard: { path: '/api/leaderboard/', model: Leaderboard },
  workouts: { path: '/api/workouts/', model: Workout }
}

for (const [resource, config] of Object.entries(routeModels)) {
  app.get(config.path, async (_request, response) => {
    try {
      const records = await config.model.find({})
      response.json({ resource, count: records.length, data: records })
    } catch (error) {
      response.status(500).json({ resource, error: (error as Error).message })
    }
  })

  app.post(config.path, async (request, response) => {
    try {
      const record = await config.model.create(request.body ?? {})
      response.status(201).json({ resource, data: record })
    } catch (error) {
      response.status(400).json({ resource, error: (error as Error).message })
    }
  })
}

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`)
      console.log(`API base URL: ${apiBaseUrl}`)
    })
  })
  .catch((error: unknown) => {
    console.warn('MongoDB connection unavailable:', error)
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port} without MongoDB connection`)
    })
  })