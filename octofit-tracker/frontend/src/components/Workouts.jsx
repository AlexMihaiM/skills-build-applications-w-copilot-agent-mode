import ResourceTable from './ResourceTable.jsx'

export default function Workouts() {
  return <ResourceTable resource="workouts" endpoint="/api/workouts/" title="Workouts" description="Practical sessions ready for your next training block." columns={[{ key: 'name', label: 'Workout' }, { key: 'focus', label: 'Focus' }, { key: 'duration', label: 'Duration' }, { key: 'difficulty', label: 'Difficulty' }]} />
}