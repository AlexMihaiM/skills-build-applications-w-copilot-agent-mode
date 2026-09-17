import ResourceTable from './ResourceTable.jsx'

export default function Activities() {
  return <ResourceTable resource="activities" endpoint="/api/activities/" title="Activity log" description="A clear view of the work your team is putting in." columns={[{ key: 'user', label: 'Athlete' }, { key: 'type', label: 'Activity' }, { key: 'duration', label: 'Duration' }, { key: 'date', label: 'Date' }]} />
}