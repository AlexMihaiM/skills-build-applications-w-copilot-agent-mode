import ResourceTable from './ResourceTable.jsx'

export default function Leaderboard() {
  return <ResourceTable resource="leaderboard" title="Leaderboard" description="Friendly competition that keeps momentum visible." columns={[{ key: 'rank', label: 'Rank' }, { key: 'user', label: 'Athlete' }, { key: 'points', label: 'Points' }, { key: 'streak', label: 'Streak' }]} />
}