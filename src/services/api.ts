import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { getToken } from '.';

type DetailMessageType = {
  errorType: string;
  message: string;
  details: {
    messages: string[];
  }[];
}

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const REQUEST_TIMEOUT_ERROR_MESSAGE = 'There was a problem with your connection. Please try again.';
const REQUEST_SERVER_UNAVAILABE_MESSAGE = 'Server is unavailable';

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
      if (error.code === AxiosError.ECONNABORTED) {
        toast.error(REQUEST_TIMEOUT_ERROR_MESSAGE);
        throw error;
      }

      if (!error.response) {
        toast.error(REQUEST_SERVER_UNAVAILABE_MESSAGE);
        throw error;
      }

      if (error.response && shouldDisplayError(error.response)) {
        const detailMessages = error.response?.data?.details?.flatMap(({ messages }) => messages);
        detailMessages?.forEach((message) => toast.error(message));
      }

      throw error;
    }
  );

  return api;
};
