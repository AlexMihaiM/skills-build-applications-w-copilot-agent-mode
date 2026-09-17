import mongoose from 'mongoose'
import { Activity } from '../models/Activity.js'
import { Leaderboard } from '../models/Leaderboard.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ])

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        age: 16,
        grade: '10',
        team: 'Thunder Strikers',
        favoriteWorkout: 'Running',
        totalPoints: 820
      },
      {
        name: 'Lucas Nguyen',
        email: 'lucas.nguyen@example.com',
        age: 15,
        grade: '9',
        team: 'Thunder Strikers',
        favoriteWorkout: 'Strength',
        totalPoints: 760
      },
      {
        name: 'Maya Rodriguez',
        email: 'maya.rodriguez@example.com',
        age: 17,
        grade: '11',
        team: 'Sky Sprinters',
        favoriteWorkout: 'Cycling',
        totalPoints: 900
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@example.com',
        age: 16,
        grade: '10',
        team: 'Sky Sprinters',
        favoriteWorkout: 'Walking',
        totalPoints: 690
      }
    ])

    const teams = await Team.insertMany([
      {
        name: 'Thunder Strikers',
        captain: 'Ava Patel',
        members: ['Ava Patel', 'Lucas Nguyen'],
        points: 1580,
        color: '#f59e0b'
      },
      {
        name: 'Sky Sprinters',
        captain: 'Maya Rodriguez',
        members: ['Maya Rodriguez', 'Noah Kim'],
        points: 1590,
        color: '#22c55e'
      }
    ])

    const activities = await Activity.insertMany([
      {
        userId: String(users[0]._id),
        userName: 'Ava Patel',
        type: 'Running',
        durationMinutes: 35,
        distanceKm: 5.4,
        caloriesBurned: 420,
        notes: 'Strong tempo run before school.'
      },
      {
        userId: String(users[1]._id),
        userName: 'Lucas Nguyen',
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 360,
        notes: 'Upper body circuit completed.'
      },
      {
        userId: String(users[2]._id),
        userName: 'Maya Rodriguez',
        type: 'Cycling',
        durationMinutes: 50,
        distanceKm: 12.1,
        caloriesBurned: 510,
        notes: 'Weekend ride with team challenge pace.'
      },
      {
        userId: String(users[3]._id),
        userName: 'Noah Kim',
        type: 'Walking',
        durationMinutes: 30,
        distanceKm: 3.6,
        caloriesBurned: 180,
        notes: 'Recovery walk after practice.'
      }
    ])

    const leaderboard = await Leaderboard.insertMany([
      {
        userId: String(users[2]._id),
        name: 'Maya Rodriguez',
        team: 'Sky Sprinters',
        points: 900,
        rank: 1
      },
      {
        userId: String(users[0]._id),
        name: 'Ava Patel',
        team: 'Thunder Strikers',
        points: 820,
        rank: 2
      },
      {
        userId: String(users[1]._id),
        name: 'Lucas Nguyen',
        team: 'Thunder Strikers',
        points: 760,
        rank: 3
      },
      {
        userId: String(users[3]._id),
        name: 'Noah Kim',
        team: 'Sky Sprinters',
        points: 690,
        rank: 4
      }
    ])

    const workouts = await Workout.insertMany([
      {
        title: 'Power Intervals',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 25,
        description: 'Short burst running intervals to build speed and stamina.',
        targetMuscles: ['Legs', 'Core']
      },
      {
        title: 'Core Circuit',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 20,
        description: 'Bodyweight strength set focused on posture and stability.',
        targetMuscles: ['Core', 'Back', 'Shoulders']
      },
      {
        title: 'Mobility Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 15,
        description: 'Gentle stretches to encourage recovery and flexibility.',
        targetMuscles: ['Hamstrings', 'Hips', 'Shoulders']
      }
    ])

    console.log('Seeded users:', users.length)
    console.log('Seeded teams:', teams.length)
    console.log('Seeded activities:', activities.length)
    console.log('Seeded leaderboard entries:', leaderboard.length)
    console.log('Seeded workouts:', workouts.length)
    console.log('Database seeding complete')

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

void seedDatabase()
