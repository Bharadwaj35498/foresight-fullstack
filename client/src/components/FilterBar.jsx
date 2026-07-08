import { useEffect, useState } from 'react';
import { fetchFilters, fetchStats } from '../api/insights';
import { useFilters } from '../context/FilterContext';
import { useAggregation } from '../hooks/useAggregation';

const FIELDS = [
  { key: 'end_year', label: 'End Year', allLabel: 'All years' },
  { key: 'topic', label: 'Topic', allLabel: 'All topics' },
  { key: 'sector', label: 'Sector', allLabel: 'All sectors' },
  { key: 'region', label: 'Region', allLabel: 'All regions' },
  { key: 'country', label: 'Country', allLabel: 'All countries' },
  { key: 'pestle', label: 'PEST(LE)', allLabel: 'All lenses' },
  { key: 'source', label: 'Source', allLabel: 'All sources' },
  { key: 'swot', label: 'SWOT', allLabel: 'All quadrants', hint: 'Derived category — this dataset has no native SWOT field. Computed server-side from intensity × likelihood as a demo control.' },
];

export default function FilterBar() {
  const { filters, setFilter, resetFilters } = useFilters();
  const [options, setOptions] = useState({});
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetchFilters().then(setOptions).catch(() => setOptions({}));
  }, []);

  return (
    <div className="filterbar card" id="filterbar">
      {FIELDS.map((f) => (
        <div className="filter-group" key={f.key}>
          <label>
            {f.label}
            {f.hint && <i className="hint" title={f.hint}>ⓘ</i>}
          </label>
          <select value={filters[f.key]} onChange={(e) => setFilter(f.key, e.target.value)}>
            <option value="">{f.allLabel}</option>
            {(options[f.key] || []).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      ))}
      <button className="btn btn-ghost btn-sm" onClick={resetFilters}>Reset</button>
      <div className="filter-count">{count !== null ? `${count.toLocaleString()} records` : '…'}</div>
      <FilterCountWatcher onCount={setCount} />
    </div>
  );
}

// Small helper that keeps the "N records" badge in sync with /stats
// without duplicating the fetch logic into the parent.
function FilterCountWatcher({ onCount }) {
  const { params } = useFilters();
  const { data } = useAggregation(fetchStats, params, { total: 0 });
  useEffect(() => { onCount(data.total ?? 0); }, [data, onCount]);
  return null;
}
