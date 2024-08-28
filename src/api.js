// src/api.js
import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://myhome2u.online'
    : 'http://localhost:5000';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;
