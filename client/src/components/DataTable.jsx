import { useEffect, useState } from 'react';
import { fetchInsights } from '../api/insights';
import { useFilters } from '../context/FilterContext';

const SWOT_BADGE = { Opportunity: 'badge-cyan', Strength: 'badge-primary', Threat: 'badge-rose', Weakness: 'badge-amber' };

const COLUMNS = [
  { key: 'country', label: 'Country' },
  { key: 'region', label: 'Region' },
  { key: 'sector', label: 'Sector' },
  { key: 'topic', label: 'Topic' },
  { key: 'pestle', label: 'PESTLE' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'likelihood', label: 'Likelihood' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'end_year', label: 'End Yr' },
  { key: 'source', label: 'Source' },
];

export default function DataTable() {
  const { params, search } = useFilters();
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: 'intensity', dir: 'desc' });
  const [loading, setLoading] = useState(true);
  const [tableSearch, setTableSearch] = useState('');

  useEffect(() => { setPage(1); }, [JSON.stringify(params), search, tableSearch]);

  useEffect(() => {
    setLoading(true);
    fetchInsights({
      ...params,
      search: tableSearch || search || undefined,
      page,
      limit: 9,
      sortKey: sort.key,
      sortDir: sort.dir,
    })
      .then((res) => { setRows(res.data); setPagination(res.pagination); })
      .catch(() => { setRows([]); })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params), search, tableSearch, page, sort.key, sort.dir]);

  function toggleSort(key) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }

  return (
    <div className="card table-card">
      <div className="table-toolbar">
        <div className="search-box small">
          <span>⌕</span>
          <input value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} type="text" placeholder="Search this table…" />
        </div>
        <div className="table-meta">{pagination.total.toLocaleString()} rows</div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} onClick={() => toggleSort(c.key)}>
                  {c.label} {sort.key === c.key ? (sort.dir === 'asc' ? '↑' : '↓') : '⇅'}
                </th>
              ))}
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>Loading…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={COLUMNS.length + 1} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>No records match the current filters.</td></tr>
            )}
            {!loading && rows.map((d, i) => (
              <tr key={i}>
                <td>{d.country || '—'}</td>
                <td>{d.region || '—'}</td>
                <td>{d.sector || '—'}</td>
                <td>{d.topic || '—'}</td>
                <td><span className={`badge ${SWOT_BADGE[d.derived_swot] || 'badge-primary'}`} style={{ fontSize: 10.5 }}>{d.pestle || '—'}</span></td>
                <td className="mono">{d.intensity ?? '—'}</td>
                <td className="mono">{d.likelihood ?? '—'}</td>
                <td className="mono">{d.relevance ?? '—'}</td>
                <td className="mono">{d.end_year || '—'}</td>
                <td>{d.source || '—'}</td>
                <td style={{ maxWidth: 280, whiteSpace: 'normal', fontSize: 12.5, color: 'var(--text-muted)' }}>{d.title || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Prev</button>
        <span>Page {pagination.page} of {pagination.pages}</span>
        <button className="btn btn-ghost btn-sm" disabled={page >= pagination.pages} onClick={() => setPage((p) => p + 1)}>Next →</button>
      </div>
    </div>
  );
}
