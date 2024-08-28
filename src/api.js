import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

console.log('Base URL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;
