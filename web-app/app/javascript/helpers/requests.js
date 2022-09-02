import axios from 'axios';
import { BASE_URL } from './constants'

const requestClient = (token = '') => {
  const defaultOptions = {
    baseURL: BASE_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      'Authorization': `Bearer ${token}`
    },
  }

  return axios.create(defaultOptions);
}

export const getRequest = (url, token) => {
  return requestClient(token).get(url);
} 

export const postRequest = (url, data, token) => {
  return requestClient(token).post(url, data);
}
