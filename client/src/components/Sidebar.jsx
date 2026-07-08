import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: 'overview', icon: '◧', label: 'Overview' },
  { to: 'geography', icon: '🌍', label: 'Geography' },
  { to: 'sectors', icon: '🌳', label: 'Sectors & Topics' },
  { to: 'flows', icon: '🌊', label: 'Flows & Hierarchy' },
  { to: 'trends', icon: '📈', label: 'Trends & Scoring' },
  { to: 'explorer', icon: '▤', label: 'Data Explorer' },
];

export default function Sidebar({ open, onNavigate }) {
  const { logout, user } = useAuth();
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} id="sidebar">
      <div className="side-brand">
        <span className="mark">◈</span>
        <span className="brand-name">Foresight</span>
      </div>

      <nav className="side-nav">
        <div className="nav-label">Menu</div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            <i>{item.icon}</i><span>{item.label}</span>
          </NavLink>
        ))}

        <div className="nav-label">Account</div>
        <a href="#logout" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); }}>
          <i>⎋</i><span>Sign out</span>
        </a>
      </nav>

      <div className="side-foot card">
        <div className="side-foot-title">{user?.name || 'Analyst'}</div>
        <div className="side-foot-sub">{user?.email || 'Connected to MongoDB'}</div>
      </div>
    </aside>
  );
}
