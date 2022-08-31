import axios from 'axios';
import { BASE_URL, GET_ORDERS } from './constants'

const requestClient = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
    },
  }

   const clientInstance = axios.create(defaultOptions);

   clientInstance.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     config.headers.Authorization =  token ? `Bearer ${token}` : 'Bearer 1';

     return config;
   });
 
   return clientInstance;
}

export const getRequest = (url) => {
  return requestClient().get(url);
} 

export const postRequest = (url, data) => {
  return requestClient().post(url, data);
}

export const fetchData = async (dispatch, action) => {
  try {
    const res = await getRequest(GET_ORDERS);

    dispatch(action(res.data));
  } catch (error) {
    throw new Error('An error occurred during request', error);
  }
}
