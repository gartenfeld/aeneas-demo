import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 12000,
});
