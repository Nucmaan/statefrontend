import axios from 'axios';

const baseURL = 'https://backendm2u.myhome2u.online';

//http://localhost:5000
//https://backendm2u.myhome2u.online

console.log(baseURL);

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;
