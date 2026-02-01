import axios from 'axios';

// This logic checks if the app is running locally or on the internet
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://your-backend-name.onrender.com/api'; // <--- Paste your Render URL here

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;