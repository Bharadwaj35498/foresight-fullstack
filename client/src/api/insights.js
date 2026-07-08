import api from './client';

export const login = (email, password) => api.post('/auth/login', { email, password }).then((r) => r.data);

export const fetchFilters = () => api.get('/insights/filters').then((r) => r.data);
export const fetchStats = (params) => api.get('/insights/stats', { params }).then((r) => r.data);
export const fetchTicker = () => api.get('/insights/ticker').then((r) => r.data);

export const fetchByCountry = (params) => api.get('/insights/aggregations/by-country', { params }).then((r) => r.data);
export const fetchBySector = (params) => api.get('/insights/aggregations/by-sector', { params }).then((r) => r.data);
export const fetchTreemap = (params) => api.get('/insights/aggregations/treemap', { params }).then((r) => r.data);
export const fetchHeatmap = (params) => api.get('/insights/aggregations/heatmap', { params }).then((r) => r.data);
export const fetchRadar = (params) => api.get('/insights/aggregations/radar', { params }).then((r) => r.data);
export const fetchSankey = (params) => api.get('/insights/aggregations/sankey', { params }).then((r) => r.data);
export const fetchSunburst = (params) => api.get('/insights/aggregations/sunburst', { params }).then((r) => r.data);
export const fetchTimeline = (params) => api.get('/insights/aggregations/timeline', { params }).then((r) => r.data);
export const fetchBubble = (params) => api.get('/insights/aggregations/bubble', { params }).then((r) => r.data);

export const fetchInsights = (params) => api.get('/insights', { params }).then((r) => r.data);
