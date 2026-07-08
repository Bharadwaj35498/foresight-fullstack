import { fetchStats } from '../api/insights';
import { useAggregation } from '../hooks/useAggregation';
import { useFilters } from '../context/FilterContext';

export default function KpiRow() {
  const { params } = useFilters();
  const { data, loading } = useAggregation(fetchStats, params, {
    total: 0, avgIntensity: 0, avgLikelihood: 0, avgRelevance: 0, countryCount: 0,
  });

  const cards = [
    { key: 'total', label: 'Total signals', badge: 'All', badgeClass: 'badge-primary', value: (data.total || 0).toLocaleString(), foot: 'matching current filters' },
    { key: 'avgIntensity', label: 'Avg intensity', badge: '1–10', badgeClass: 'badge-rose', value: (data.avgIntensity || 0).toFixed(1), foot: 'signal strength score' },
    { key: 'avgLikelihood', label: 'Avg likelihood', badge: '1–5', badgeClass: 'badge-amber', value: (data.avgLikelihood || 0).toFixed(1), foot: 'probability of occurrence' },
    { key: 'avgRelevance', label: 'Avg relevance', badge: '1–5', badgeClass: 'badge-cyan', value: (data.avgRelevance || 0).toFixed(1), foot: 'importance to brief' },
    { key: 'countryCount', label: 'Countries', badge: 'reach', badgeClass: 'badge-primary', value: data.countryCount || 0, foot: 'distinct geographies' },
  ];

  return (
    <div className="kpi-row">
      {cards.map((c) => (
        <div className="card kpi" key={c.key}>
          <div className="kpi-top"><span>{c.label}</span><span className={`badge ${c.badgeClass}`}>{c.badge}</span></div>
          <div className="kpi-value">{loading ? '—' : c.value}</div>
          <div className="kpi-foot">{c.foot}</div>
        </div>
      ))}
    </div>
  );
}
