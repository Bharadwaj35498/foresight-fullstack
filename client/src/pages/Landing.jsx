import { Link } from 'react-router-dom';
import '../styles/landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="nav">
        <div className="brand"><span className="mark">◈</span> Foresight</div>
        <nav className="nav-links">
          <a href="#features">Platform</a>
          <a href="#viz">Visualizations</a>
          <a href="#data">Data</a>
        </nav>
        <div className="nav-cta">
          <Link to="/login" className="btn btn-ghost btn-sm">Sign in</Link>
          <Link to="/login" className="btn btn-primary btn-sm">Try the demo</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow">● 1,000+ analyst signals, live from MongoDB</div>
            <h1>See the world's risk &amp; opportunity signals <em>before they trend.</em></h1>
            <p className="lead">Foresight turns raw analyst reports — sectors, topics, regions, PESTLE signals — into one interactive command center, served live from a MongoDB-backed REST API. Filter, drill down, and act on intensity, likelihood and relevance in real time.</p>
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">Enter the dashboard →</Link>
              <a href="#viz" className="btn btn-ghost">Explore visualizations</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>1,000</b><span>Records analyzed</span></div>
              <div className="stat"><b>56</b><span>Countries covered</span></div>
              <div className="stat"><b>18</b><span>Sectors tracked</span></div>
              <div className="stat"><b>9</b><span>PESTLE dimensions</span></div>
            </div>
          </div>

          <div className="preview-card">
            <div className="preview-top">
              <div className="dots"><span></span><span></span><span></span></div>
              <div className="tag">GET /api/insights/stats</div>
            </div>
            <div className="preview-bars">
              <i style={{ height: '38%' }}></i><i style={{ height: '62%' }}></i><i style={{ height: '44%' }}></i>
              <i style={{ height: '80%' }}></i><i style={{ height: '56%' }}></i><i style={{ height: '70%' }}></i>
              <i style={{ height: '30%' }}></i><i style={{ height: '66%' }}></i><i style={{ height: '50%' }}></i>
            </div>
            <div className="preview-rows">
              <div className="row"><span className="lab">ENERGY</span><span className="track"><i style={{ width: '82%' }}></i></span></div>
              <div className="row"><span className="lab">ECONOMIC</span><span className="track"><i style={{ width: '64%' }}></i></span></div>
              <div className="row"><span className="lab">POLITICAL</span><span className="track"><i style={{ width: '41%' }}></i></span></div>
              <div className="row"><span className="lab">TECH</span><span className="track"><i style={{ width: '28%' }}></i></span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="logos">
        <div className="logos-inner">
          <span>Data sources include</span>
          <span>OPEC</span><span>Bloomberg</span><span>Reuters</span><span>World Bank</span><span>EIA</span><span>FAO</span><span>Guardian</span>
        </div>
      </div>

      <section className="section" id="features">
        <div className="section-head">
          <div className="eyebrow badge badge-primary">Platform</div>
          <h2>Built for analysts who read the world in signals.</h2>
          <p>Every card in Foresight answers one question: where should attention go next? Slice by geography, sector, or PESTLE lens without leaving the page — powered by a real Express + MongoDB API underneath.</p>
        </div>
        <div className="feature-grid">
          <div className="card feature-card">
            <div className="ico" style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>◈</div>
            <h3>Unified filter engine</h3>
            <p>End year, topic, sector, region, PESTLE, source, SWOT and country filters all cross-apply instantly, computed server-side via MongoDB aggregation pipelines.</p>
          </div>
          <div className="card feature-card">
            <div className="ico" style={{ background: '#E3FBF8', color: '#0E9C8F' }}>◐</div>
            <h3>11 interactive visual types</h3>
            <p>Choropleth maps, sunburst drilldowns, sankey flows, treemaps and more — each backed by a dedicated aggregation endpoint.</p>
          </div>
          <div className="card feature-card">
            <div className="ico" style={{ background: '#FFF4DE', color: '#B87A00' }}>▤</div>
            <h3>Row-level explorer</h3>
            <p>A searchable, sortable, paginated table calls the same REST API so you can trace any insight back to its source record.</p>
          </div>
          <div className="card feature-card">
            <div className="ico" style={{ background: '#FDE9EE', color: '#D42A50' }}>◆</div>
            <h3>Intensity-weighted scoring</h3>
            <p>Bubble and heat visuals size and shade by intensity so the highest-signal stories surface first, automatically.</p>
          </div>
          <div className="card feature-card">
            <div className="ico" style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>⬡</div>
            <h3>Sector → topic hierarchies</h3>
            <p>Treemap and sunburst views reveal how topics nest inside sectors and regions — structure you can't see in a spreadsheet.</p>
          </div>
          <div className="card feature-card">
            <div className="ico" style={{ background: '#E3FBF8', color: '#0E9C8F' }}>↝</div>
            <h3>JWT-secured API</h3>
            <p>Every data endpoint requires a signed-in session — the same auth token your browser holds protects every request.</p>
          </div>
        </div>
      </section>

      <section className="section" id="viz">
        <div className="section-head">
          <div className="eyebrow badge badge-cyan">Visualizations</div>
          <h2>One live dataset, eleven lenses.</h2>
          <p>Every view below is wired to the same MongoDB-backed, filterable API.</p>
        </div>
        <div className="viz-strip">
          <div className="card viz-chip"><div className="glyph">🌍</div><span>Choropleth Map</span></div>
          <div className="card viz-chip"><div className="glyph">📊</div><span>Top Countries</span></div>
          <div className="card viz-chip"><div className="glyph">🌳</div><span>Sector Treemap</span></div>
          <div className="card viz-chip"><div className="glyph">☀️</div><span>Region Sunburst</span></div>
          <div className="card viz-chip"><div className="glyph">🔥</div><span>Region × Sector Heat</span></div>
          <div className="card viz-chip"><div className="glyph">📈</div><span>Trend Over Years</span></div>
          <div className="card viz-chip"><div className="glyph">🎈</div><span>Likelihood × Relevance</span></div>
          <div className="card viz-chip"><div className="glyph">🍩</div><span>Sector Distribution</span></div>
          <div className="card viz-chip"><div className="glyph">🌊</div><span>Sankey Flow</span></div>
          <div className="card viz-chip"><div className="glyph">🕸️</div><span>PESTLE Radar</span></div>
          <div className="card viz-chip"><div className="glyph">▤</div><span>Data Explorer</span></div>
        </div>
      </section>

      <div className="cta-band" id="data">
        <h2>Your data, already in MongoDB.</h2>
        <p>Sign in to open the live dashboard — connected to your own database.</p>
        <Link to="/login" className="btn btn-primary">Go to sign in →</Link>
      </div>

      <footer className="site-footer">
        <div className="brand" style={{ fontSize: '15px' }}><span className="mark" style={{ width: '26px', height: '26px', fontSize: '13px' }}>◈</span> Foresight</div>
        <span>React + Express + MongoDB · Enterprise build</span>
      </footer>
    </div>
  );
}
