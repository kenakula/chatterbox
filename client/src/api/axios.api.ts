import axios from 'axios';

import { appConfig } from '@app/app.config';

export const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => response.data);
