import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

type DetailMessageType = {
  type: string;
  message: string;
}

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && (error.response.status as StatusCodes) !== StatusCodes.UNAUTHORIZED) {
        const detailMessage = error.response.data;
        toast.error(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
