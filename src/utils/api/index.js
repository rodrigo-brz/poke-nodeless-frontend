import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const myAxios = axios.create({
  baseURL: apiBaseURL || 'http://localhost:4000/',
});

export default myAxios;
