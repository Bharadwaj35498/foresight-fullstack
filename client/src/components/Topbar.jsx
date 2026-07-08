import { useAuth } from '../context/AuthContext';
import { useFilters } from '../context/FilterContext';

const TITLES = {
  overview: ['Overview', 'Global signal intelligence at a glance'],
  geography: ['Geography', 'Where signal density concentrates'],
  sectors: ['Sectors & Topics', 'How topics nest inside each sector'],
  flows: ['Flows & Hierarchy', 'Tracing signals across regions, countries and sectors'],
  trends: ['Trends & Scoring', 'Momentum over time and risk scoring'],
  explorer: ['Data Explorer', 'Every record behind the visuals'],
};

export default function Topbar({ section, onMenuToggle }) {
  const { user } = useAuth();
  const { search, setSearch } = useFilters();
  const [title, subtitle] = TITLES[section] || TITLES.overview;
  const initials = (user?.name || 'AN').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();

  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onMenuToggle} aria-label="Toggle menu">☰</button>
      <div className="topbar-title">
        <h1>{title}</h1>
        <span>{subtitle}</span>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search titles, sources, topics…"
          />
        </div>
        <div className="avatar" title={user?.email}>{initials}</div>
      </div>
    </header>
  );
}
