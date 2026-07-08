import { useEffect, useState } from 'react';
import { fetchTicker } from '../api/insights';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export default function Ticker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTicker().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return <div className="ticker" />;

  const row = items.map((d, i) => (
    <span key={i}><b>●</b> {escapeHtml(d.title)} — <b>{d.country || d.region || 'Global'}</b></span>
  ));

  return (
    <div className="ticker">
      <div className="ticker-track">{row}{row}</div>
    </div>
  );
}
