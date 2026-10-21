import axios from "axios";

// Using default API base path /api
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const api = axios.create({ baseURL: API_BASE, timeout: 8000 });

export const fetchOverview     = ()           => api.get("/stats/summary").then(r => r.data);
export const fetchFeedLive     = (limit = 20) => api.get(`/feed/live?limit=${limit}`).then(r => r.data);
export const fetchSentiment    = (hours = 24) => api.get(`/sentiment/timeline?hours=${hours}`).then(r => r.data);
export const fetchTopics       = (limit = 10) => api.get(`/trends/top?limit=${limit}`).then(r => r.data);
export const fetchDemographics = ()           => api.get("/demographics/summary").then(r => r.data);
export const fetchNetworkGraph = ()           => api.get("/network/graph").then(r => r.data);
