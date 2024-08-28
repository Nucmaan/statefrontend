import axios from 'axios';

const baseURL = 'http://localhost:5000';

console.log(baseURL);

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;
