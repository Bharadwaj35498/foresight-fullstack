export default function ChartCard({ title, subtitle, span2, tall, loading, error, children }) {
  return (
    <div className={`card chart-card ${span2 ? 'span-2' : ''}`}>
      <div className="chart-head">
        <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
      </div>
      <div className={`chart-box ${tall ? 'tall' : ''}`} style={{ position: 'relative' }}>
        {loading && <ChartOverlay><span className="spinner" /></ChartOverlay>}
        {!loading && error && <ChartOverlay><span className="chart-error">{error}</span></ChartOverlay>}
        {!loading && !error && children}
      </div>
    </div>
  );
}

function ChartOverlay({ children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13,
    }}>
      {children}
    </div>
  );
}
