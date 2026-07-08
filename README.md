# Foresight — Global Risk & Trend Intelligence Dashboard

A full-stack, enterprise-style analytics dashboard built on the **MERN stack**
(MongoDB, Express, React, Node.js), visualizing 1,000 analyst insight records
across sectors, topics, regions, and PESTLE dimensions.

- **Backend:** Node.js + Express + Mongoose, JWT auth, MongoDB aggregation
  pipelines power every chart.
- **Frontend:** React 19 + Vite, React Router, ECharts + D3 for 11 different
  interactive visualizations, all fetched live from the API.
- **Database:** MongoDB (works with a local `mongod` or a free MongoDB Atlas
  cluster — full instructions below).

```
foresight-fullstack/
├── server/          Express + MongoDB REST API
│   ├── src/
│   │   ├── config/db.js            Mongo connection
│   │   ├── models/                 Mongoose schemas (Insight, User)
│   │   ├── controllers/            Route handlers + aggregation pipelines
│   │   ├── routes/                 /api/auth, /api/insights
│   │   ├── middleware/             JWT auth guard, error handler
│   │   ├── scripts/seed.js         Loads insights.json into MongoDB
│   │   ├── scripts/createAdmin.js  Creates the demo login user
│   │   └── data/insights.json      Source dataset (1,000 records)
│   ├── .env.example
│   └── package.json
├── client/          React (Vite) frontend
│   └── src/
│       ├── pages/            Landing, Login, Dashboard + 6 dashboard sections
│       ├── components/       Sidebar, Topbar, FilterBar, KPIs, DataTable
│       ├── components/charts Choropleth (D3), + 9 ECharts visualizations
│       ├── context/          Auth + shared Filter state
│       ├── hooks/            useAggregation (data-fetching hook)
│       └── api/              Axios client + typed API calls
└── README.md        ← you are here
```

---

## 1. Prerequisites

| Tool | Version | Check with |
|---|---|---|
| Node.js | 18+ (20 LTS recommended) | `node -v` |
| npm | 9+ | `npm -v` |
| MongoDB | 6+ (local) **or** a free MongoDB Atlas cluster | see §2 |

You do **not** need to install anything globally — MongoDB can be a cloud
Atlas cluster, so step 2 below covers both paths.

---

## 2. Set up MongoDB

You have two options. **Option A (Atlas) is the fastest and needs no local
install** — recommended if you're just trying this out.

### Option A — MongoDB Atlas (free cloud cluster, ~5 minutes)

1. Go to **https://www.mongodb.com/cloud/atlas/register** and create a free
   account (or sign in).
2. Click **"Build a Database"** → choose the **M0 Free** tier → pick any
   cloud provider/region close to you → click **Create**.
3. **Create a database user**:
   - You'll be prompted under "Security Quickstart". Choose
     *Username/Password* authentication.
   - Set a username (e.g. `foresight_app`) and a strong password. **Save
     these** — you'll need them in the connection string.
4. **Allow network access**:
   - Under "Where would you like to connect from?", click **Add My Current
     IP Address**. For local development you can alternatively click
     **Allow Access from Anywhere** (`0.0.0.0/0`) — convenient for testing,
     but tighten this before any real deployment.
5. **Get your connection string**:
   - Once the cluster finishes provisioning (1–3 minutes), click **Connect**
     on your cluster → **Drivers** → select **Node.js**.
   - Copy the connection string. It looks like:
     ```
     mongodb+srv://foresight_app:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual database user password, and add
     a database name before the `?`, e.g. `...mongodb.net/foresight?retryWrites=true&w=majority`.
6. Paste the full string into `server/.env` as `MONGODB_URI` (see §3).

### Option B — Local MongoDB

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Windows:**
1. Download the MSI installer from
   https://www.mongodb.com/try/download/community
2. Run it with the "Complete" setup type and **also install MongoDB
   Compass** (GUI) when prompted.
3. MongoDB installs as a Windows Service and starts automatically. Confirm
   with `mongod --version` in a new terminal.

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify it's running:
```bash
mongosh --eval "db.runCommand({ ping: 1 })"
```

With a local install, your connection string is simply:
```
mongodb://127.0.0.1:27017/foresight
```

---

## 3. Configure and run the backend (API server)

```bash
cd server
cp .env.example .env
```

Open `server/.env` and set:

```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/foresight        # or your Atlas string
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@foresight.io
ADMIN_PASSWORD=ChooseYourOwnPassword!2026
```

> Generate a strong `JWT_SECRET` quickly with:
> `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

Install dependencies and seed the database:

```bash
npm install
npm run seed          # loads the 1,000 insight records into MongoDB
npm run create-admin  # creates the login user from ADMIN_EMAIL / ADMIN_PASSWORD
```

You should see output like:
```
✅  MongoDB connected → foresight @ 127.0.0.1
📥  Inserting 1000 insight records…
✅  Inserted 1000 documents into "insights" collection.
```

Start the API:

```bash
npm run dev      # auto-restarts on file changes (nodemon)
# or
npm start        # plain node
```

You should see:
```
✅  MongoDB connected → foresight @ 127.0.0.1
🚀  Foresight API listening on http://localhost:5000
```

**Quick sanity check** (in another terminal):
```bash
curl http://localhost:5000/api/health
# → {"status":"ok","time":"..."}
```

### Re-seeding

Running `npm run seed` again will insert duplicate copies of the dataset.
If you want a clean slate:
```bash
npm run seed:fresh   # drops the insights collection first, then re-inserts
```

---

## 4. Configure and run the frontend

Open a **new terminal** (leave the API running):

```bash
cd client
cp .env.example .env
```

`client/.env` just needs to point at your API:
```ini
VITE_API_URL=http://localhost:5000/api
```

Install and run:
```bash
npm install
npm run dev
```

Vite will print a local URL, typically:
```
➜  Local:   http://localhost:5173/
```

Open it in your browser. You'll land on the marketing/landing page →
click **"Try the demo"** → sign in with the admin credentials you set in
`server/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, pre-filled in the login
form for convenience) → you're in the live dashboard.

---

## 5. What's actually live vs. static

Everything you see in the dashboard is fetched from the API in real time —
there is no mock/static JSON in the frontend. Specifically:

| Dashboard feature | API endpoint |
|---|---|
| Login | `POST /api/auth/login` |
| Filter dropdown options | `GET /api/insights/filters` |
| KPI cards | `GET /api/insights/stats` |
| Choropleth map + top-countries bar | `GET /api/insights/aggregations/by-country` |
| Sector donut | `GET /api/insights/aggregations/by-sector` |
| Sector → topic treemap | `GET /api/insights/aggregations/treemap` |
| Region × sector heatmap | `GET /api/insights/aggregations/heatmap` |
| PESTLE radar | `GET /api/insights/aggregations/radar` |
| Region → country → sector sankey | `GET /api/insights/aggregations/sankey` |
| Region → country → topic sunburst | `GET /api/insights/aggregations/sunburst` |
| Yearly trend line/bar | `GET /api/insights/aggregations/timeline` |
| Likelihood × relevance bubble chart | `GET /api/insights/aggregations/bubble` |
| Insight ticker (top strip) | `GET /api/insights/ticker` |
| Data Explorer table | `GET /api/insights` (paginated, sorted, searched) |

Every one of these accepts the same shared filter query params —
`end_year, topic, sector, region, country, pestle, source, swot, search` —
so changing a filter in the top bar re-queries MongoDB and updates every
chart on the page.

All `/api/insights*` routes require a valid JWT (the token your browser
receives at login), so the data endpoints are not publicly open.

### A note on the SWOT filter

The source dataset has **no native SWOT field**. To give the SWOT filter
real functionality rather than leaving it decorative, the seed script
derives a `derived_swot` value per record from `intensity` × `likelihood`:

| Intensity | Likelihood | SWOT quadrant |
|---|---|---|
| ≥ 6 | ≥ 4 | Opportunity |
| < 6 | ≥ 4 | Strength |
| ≥ 6 | < 4 | Threat |
| < 6 | < 4 | Weakness |

This is flagged with an "ⓘ" tooltip next to the filter in the UI so it's
transparent that it's a derived, demo-only heuristic rather than
data that shipped in the original JSON.

---

## 6. Tech stack rationale

- **MongoDB** was the explicit requirement; the schema is intentionally
  close to the source JSON so seeding is a near-direct mapping, with a
  couple of denormalized fields (`derived_year`, `derived_swot`) computed
  once at seed time so hot-path aggregations avoid repeating that logic
  per request.
- **Express + Mongoose** for the API — a minimal, well-understood layer
  over MongoDB's aggregation framework, which does all the heavy lifting
  (group/count/average) so the frontend never has to process raw rows.
- **React + Vite** for the frontend — fast dev server, small production
  build, and a component model that maps cleanly onto "one component per
  chart, one hook per data source."
- **ECharts** (via `echarts-for-react`) covers 9 of the 11 visual types
  (bar, donut, treemap, heatmap, radar, sankey, sunburst, line, bubble)
  with a single consistent theme. **D3** (+ `topojson-client`) handles the
  one visual ECharts doesn't do natively as well: the choropleth world map,
  which needs real geographic projections.
- **JWT auth** rather than sessions, since the API is stateless and this
  keeps the frontend/backend fully decoupled (any client — mobile, another
  SPA, Postman — can authenticate the same way).

---

## 7. Common issues

**"❌ MongoDB connection failed"** on server start
→ Check `MONGODB_URI` in `server/.env`. For Atlas, confirm your current IP
is allow-listed (Network Access tab) and that the password in the string
doesn't contain characters that need URL-encoding (`@`, `#`, `%` etc. —
if your password has special characters, URL-encode them or regenerate a
simpler password).

**Login fails with "Invalid email or password"**
→ Run `npm run create-admin` again inside `server/` — it upserts the user,
so it's safe to re-run after changing `ADMIN_EMAIL`/`ADMIN_PASSWORD` in
`.env`.

**Charts show "Failed to load data"**
→ Usually means the frontend can't reach the API. Confirm
`VITE_API_URL` in `client/.env` matches where the server is actually
running, and that `CLIENT_ORIGIN` in `server/.env` matches where Vite is
actually running (CORS will otherwise block the request — check the
browser console for a CORS error specifically).

**Map shows "Map tiles require network access to jsdelivr.net"**
→ The choropleth fetches world boundary data from a public CDN
(`cdn.jsdelivr.net`) at runtime. If your network blocks that domain, every
other chart still works — only the map is affected.

**Port already in use**
→ Change `PORT` in `server/.env` (and update `VITE_API_URL` in
`client/.env` to match), or stop whatever else is bound to 5000/5173.

---

## 8. Production build

```bash
# Frontend — outputs static files to client/dist
cd client
npm run build
npm run preview   # sanity-check the production build locally

# Backend — just run it with a process manager
cd server
NODE_ENV=production npm start
```

Serve `client/dist` from any static host (Vercel, Netlify, S3+CloudFront,
Nginx, etc.) and point `VITE_API_URL` (baked in at build time) at your
deployed API's public URL. Deploy the `server/` folder to any Node host
(Render, Railway, Fly.io, an EC2 box, etc.) with your production
`MONGODB_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN` set as environment
variables there.
