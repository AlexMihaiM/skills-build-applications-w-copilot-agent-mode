import ResourceTable from './ResourceTable.jsx'

export default function Users() {
  return <ResourceTable resource="users" endpoint="/api/users/" title="Athletes" description="Everyone bringing energy to the OctoFit community." columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'team', label: 'Team' }, { key: 'level', label: 'Level' }]} />
}