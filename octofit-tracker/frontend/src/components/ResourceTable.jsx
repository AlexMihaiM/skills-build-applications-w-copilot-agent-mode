import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function ResourceTable({ resource, endpoint, title, description, columns }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchResource(endpoint)
      .then((data) => { if (active) { setRecords(data); setStatus('ready') } })
      .catch((requestError) => { if (active) { setError(requestError.message); setStatus('error') } })
    return () => { active = false }
  }, [endpoint])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div><p className="eyebrow">OctoFit / {resource}</p><h1>{title}</h1><p className="lead">{description}</p></div>
        <span className="record-count">{records.length} records</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading {resource}...</p>}
      {status === 'error' && <p className="state-message error">{error}</p>}
      {status === 'ready' && (
        <div className="table-wrap">
          <table className="table align-middle">
            <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
            <tbody>
              {records.length === 0 ? <tr><td colSpan={columns.length} className="empty-state">No records yet.</td></tr> : records.map((record, index) => <tr key={record._id ?? record.id ?? index}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(record) : String(record[column.key] ?? '-')}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}