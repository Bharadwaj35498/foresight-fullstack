import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Ticker from '../components/Ticker';
import FilterBar from '../components/FilterBar';
import Overview from './dashboard/Overview';
import Geography from './dashboard/Geography';
import Sectors from './dashboard/Sectors';
import Flows from './dashboard/Flows';
import Trends from './dashboard/Trends';
import Explorer from './dashboard/Explorer';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const section = location.pathname.split('/')[2] || 'overview';

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="main">
        <Topbar section={section} onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <Ticker />
        <FilterBar />

        <main className="content">
          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="geography" element={<Geography />} />
            <Route path="sectors" element={<Sectors />} />
            <Route path="flows" element={<Flows />} />
            <Route path="trends" element={<Trends />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="*" element={<Navigate to="overview" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
