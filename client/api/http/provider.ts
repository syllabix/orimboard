import axios, { AxiosInstance } from "axios";
import qs from "qs";

export const provider = (baseURL: string): AxiosInstance =>
  axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
      accept: "application/json",
    },
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
    paramsSerializer: {
      encode: (params: string) => qs.stringify(params),
    },
  });
