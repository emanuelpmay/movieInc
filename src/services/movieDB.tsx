import axios from 'axios';
import { API_KEY } from '../constants/constant';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'es-ES',
    page: 1,
  },
});


export default movieDB;