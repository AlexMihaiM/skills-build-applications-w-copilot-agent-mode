import ResourceTable from './ResourceTable.jsx'

export default function Teams() {
  return <ResourceTable resource="teams" endpoint="/api/teams/" title="Teams" description="Find your people and make progress together." columns={[{ key: 'name', label: 'Team' }, { key: 'members', label: 'Members' }, { key: 'points', label: 'Points' }, { key: 'captain', label: 'Captain' }]} />
}