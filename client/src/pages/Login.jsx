import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(import.meta.env.VITE_DEMO_EMAIL || 'admin@foresight.io');
  const [password, setPassword] = useState(import.meta.env.VITE_DEMO_PASSWORD || 'ForesightDemo!2026');

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/dashboard/overview');
  }

  return (
    <div className="login-shell">
      <div className="panel-visual">
        <div className="brand"><span className="mark">◈</span> Foresight</div>
        <div className="quote">
          <h2>"The dashboard surfaced an energy-sector shift three weeks before it hit our briefings."</h2>
          <p>Analysts use Foresight to move from 1,000 scattered reports to one prioritized view — filtered by intensity, likelihood and relevance, served live from MongoDB.</p>
          <div className="mini-stats">
            <div className="s"><b>1,000</b><span>Signals</span></div>
            <div className="s"><b>56</b><span>Countries</span></div>
            <div className="s"><b>18</b><span>Sectors</span></div>
          </div>
        </div>
      </div>

      <div className="panel-form">
        <div className="form-wrap">
          <div className="top-link"><Link to="/" className="btn btn-ghost btn-sm">← Back home</Link></div>
          <h1>Welcome back 👋</h1>
          <p className="sub">Sign in to open your Foresight dashboard.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" required />
            </div>
            <div className="row-between">
              <label><input type="checkbox" defaultChecked /> Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
            <div className="demo-hint">
              Demo credentials are pre-filled. They match the admin account created by <code>npm run create-admin</code> on the server — see the README to set yours up.
            </div>
          </form>

          <p className="footer-note">New to Foresight? <Link to="/">Learn more about the platform</Link></p>
        </div>
      </div>
    </div>
  );
}
