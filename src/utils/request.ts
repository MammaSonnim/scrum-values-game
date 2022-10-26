import axios from 'axios';
import { API_BASE_URL } from '../constants';

const API_KEY = process.env.REACT_APP_API_KEY as string;

// TODO think about error-handling with try-catch, is errorBounding enough or not
export const request = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  headers: {
    'API-KEY': API_KEY,
  },
});

export const requestDev = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3003',
});
