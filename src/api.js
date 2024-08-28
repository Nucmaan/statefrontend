import axios from 'axios';

const baseURL = 'http://backendm2u.myhome2u.online';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;
