import axios from 'axios';

import { BASE_URL } from '@consts/network';

import { handleAuthError, setAuthorization } from './interceptors';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(setAuthorization);
axiosInstance.interceptors.response.use((res) => res, handleAuthError);
