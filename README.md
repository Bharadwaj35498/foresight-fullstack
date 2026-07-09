# Foresight — Global Risk & Trend Intelligence Dashboard

A full-stack analytics platform built for the **Blackcoffer Data Visualization Dashboard Assignment**. Foresight transforms raw global insight data into interactive visualizations, enabling users to explore trends, risks, opportunities, and strategic signals through a modern dashboard experience.

## Live Demo

🔗 https://foresight-fullstack-blond.vercel.app/

## GitHub Repository

🔗 https://github.com/Bharadwaj35498/foresight-fullstack

---

## Overview

Foresight is an interactive business intelligence dashboard built using MongoDB, Express.js, React, and D3/ECharts. The application ingests the provided JSON dataset, stores it in MongoDB, exposes analytical REST APIs, and visualizes insights through rich, filterable charts.

The platform enables users to analyze:

- Intensity
- Likelihood
- Relevance
- Yearly Trends
- Countries
- Regions
- Topics
- Sectors
- PESTLE Dimensions
- Sources
- SWOT Categories

All visualizations update dynamically based on selected filters.

---

## Features

### Interactive Dashboard

- Real-time analytics
- Dynamic filtering
- Responsive UI
- Modern dashboard design

### Data Visualizations

- Global Choropleth Map
- Sector Treemap
- Sankey Flow Diagram
- Sunburst Hierarchy Chart
- PESTLE Radar Chart
- Bubble Analysis Chart
- Trend Analysis Chart
- Heatmap Visualizations
- Country Analysis
- Sector Distribution Charts

### Data Explorer

- Searchable records
- Sortable table
- Pagination support
- Filter integration

### Backend Features

- MongoDB Aggregation Pipelines
- REST API Architecture
- JWT Authentication
- Shared Filtering Engine
- Optimized Data Queries

---

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- ECharts
- D3.js
- TopoJSON

### Backend

- Node.js
- Express.js
- JWT Authentication
- Mongoose

### Database

- MongoDB Atlas

### Deployment

- Vercel
- Render

---

## Dashboard Modules

### Overview

Provides a high-level summary of the dataset including:

- Total Signals
- Average Intensity
- Average Likelihood
- Average Relevance
- Country Coverage
- Global Intelligence Map

### Geography

Analyze insights geographically through:

- Country-Level Analysis
- Regional Breakdown
- Global Heat Mapping

### Sectors & Topics

Explore:

- Sector Distribution
- Topic Hierarchies
- PESTLE Analysis
- Treemap Visualization

### Flows & Hierarchy

Visualize relationships using:

- Sankey Diagram
- Sunburst Chart

### Trends & Scoring

Analyze:

- Yearly Trends
- Intensity Evolution
- Likelihood vs Relevance Scoring

### Data Explorer

Access the complete dataset through an interactive table interface.

---

## Filters Implemented

The dashboard supports the following filters:

- End Year
- Topic
- Sector
- Region
- Country
- City
- PESTLE
- Source
- SWOT
- Search

All filters are synchronized across the entire dashboard.

---

## Assignment Requirements Coverage

| Requirement | Status |
|------------|---------|
| MongoDB Database | ✅ |
| REST API | ✅ |
| Intensity Visualization | ✅ |
| Likelihood Visualization | ✅ |
| Relevance Visualization | ✅ |
| Year Visualization | ✅ |
| Country Visualization | ✅ |
| Topic Visualization | ✅ |
| Region Visualization | ✅ |
| City Visualization | ✅ |
| End Year Filter | ✅ |
| Topic Filter | ✅ |
| Sector Filter | ✅ |
| Region Filter | ✅ |
| PESTLE Filter | ✅ |
| Source Filter | ✅ |
| SWOT Filter | ✅ |
| Country Filter | ✅ |
| City Filter | ✅ |

**Assignment Completion: 100%**

---

## Project Structure

```text
foresight-fullstack/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── data/
│   │
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── api/
│   │
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Bharadwaj35498/foresight-fullstack.git

cd foresight-fullstack
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Filters

```http
GET /api/insights/filters
```

### Statistics

```http
GET /api/insights/stats
```

### Aggregations

```http
GET /api/insights/aggregations/by-country

GET /api/insights/aggregations/by-sector

GET /api/insights/aggregations/treemap

GET /api/insights/aggregations/heatmap

GET /api/insights/aggregations/radar

GET /api/insights/aggregations/sankey

GET /api/insights/aggregations/sunburst

GET /api/insights/aggregations/timeline

GET /api/insights/aggregations/bubble
```

### Data Explorer

```http
GET /api/insights
```

---

## Key Highlights

- 11 Interactive Visualizations
- 9 Advanced Filters
- MongoDB Aggregation Framework
- Responsive Design
- Production Deployment
- Real-Time Filtering
- Interactive Data Explorer
- REST API Architecture
- D3 + ECharts Visualizations

---

## Future Scope

- CSV Export
- PDF Report Generation
- AI-Based Insight Summaries
- Real-Time Data Streaming
- Predictive Analytics
- User Saved Dashboards

---

## Author

**Bharadwaj**

CSE (Data Science)

GitHub: https://github.com/Bharadwaj35498

---

## License

This project was developed as part of the Blackcoffer Data Visualization Dashboard Assignment for educational and evaluation purposes.
