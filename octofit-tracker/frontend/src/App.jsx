import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit Tracker</span>
        </NavLink>
        <nav aria-label="Primary navigation">
          {[['/', 'Overview'], ['/activities', 'Activities'], ['/workouts', 'Workouts'], ['/teams', 'Teams'], ['/leaderboard', 'Leaderboard'], ['/users', 'Users']].map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Team wellness, in motion</p>
      <h1>Make every rep count.</h1>
      <p className="lead">Track the work, celebrate the wins, and keep your team moving together.</p>
      <div className="overview-links">
        <NavLink className="btn btn-primary" to="/activities">Log activity</NavLink>
        <NavLink className="btn btn-outline-dark" to="/leaderboard">View leaderboard</NavLink>
      </div>
    </section>
  )
}

export default App
