import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

type DetailMessageType = {
  errorType: string;
  message: string;
  details: {
    messages: string[];
  }[];
}

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

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
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessages = error.response.data.details.flatMap(({ messages }) => messages);
        detailMessages.forEach((message) => toast.error(message));
      }

      throw error;
    }
  );

  return api;
};
