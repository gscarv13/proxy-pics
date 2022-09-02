import axios from 'axios';
import { BASE_URL } from './constants';

const requestClient = (token = '', imageContent = false) => {
  const defaultOptions = {
    baseURL: BASE_URL,
    method: 'GET',
    headers: {
      'Content-Type': imageContent ? 'multipart/form-data' : 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  return axios.create(defaultOptions)
}

export const getRequest = (url, token) => {
  return requestClient(token).get(url)
} 

export const postRequest = (url, data, token) => {
  return requestClient(token).post(url, data)
}

export const putRequest = (url, data, token, imageContent = true) => {
  return requestClient(token, imageContent).put(url, data)
}
