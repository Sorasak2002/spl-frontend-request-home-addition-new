/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
// import { getSession } from "next-auth/react";
// import { toast } from "react-toastify";

// import type { EmployeeInfo } from "@/interfaces/employee";
// import { PaginatedResponse } from "@/interfaces/pagination";
// import { getTokenFromCookie } from "@/app/_actions/headerAction";
// import { isDevelopment } from "./commonUtil";

axios.defaults.withCredentials = true;

const ResponseBody = (response: AxiosResponse) => response.data;

//function หน่วงเวลา
const sleep = () => new Promise((resolve) => setTimeout(resolve, 100));

// ตอนมีการเรียก request
axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = await getValidAccessToken()
    // const employee = (await getSession()) as EmployeeInfo | null;

    if (false) {
      // ดึง token จาก cookie กรณี login แบบ Ad
      //   const accessToken = await getTokenFromCookie();
      // console.log('accessToken : ', accessToken)
      //   if (accessToken) {
      //     config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
      //     return config;
      //   }
    }

    // if (employee?.access_token)
    //   config.headers.Authorization = `Bearer ${employee?.access_token}`;

    return config;
  },
  async (error: AxiosError) => {
    return error;
  }
);

// ตอนมีการเรียก response
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    const pagination = response.headers["pagination"];

    // if (pagination) {
    //   response.data = new PaginatedResponse(
    //     response.data,
    //     JSON.parse(pagination)
    //   ).data;

    //   return response;
    // }

    return response;
  },
  async (error: AxiosError) => {
    const { message, response } = error!;

    if (false) {
      //   toast.error(message, {
      //     className: "font-ibm",
      //   });
    }

    return Promise.reject(error.response);
  }
);

export const getBASE_URL_API = () =>
  process.env.NEXT_PUBLIC_BASE_URL_API +
  "/" +
  process.env.NEXT_PUBLIC_VERSION_API;

export const requests = {
  get: (
    endPoint: string,
    option: { baseURL?: any } = {},
    params?: URLSearchParams
  ) => {
    const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

    return axios.get(url, { params }).then(ResponseBody);
  },
  put: (endPoint: string, body: any = {}, option: { baseURL?: any } = {}) => {
    const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

    return axios.put(url, body).then(ResponseBody);
  },
  post: (endPoint: string, body: any = {}, option: { baseURL?: any } = {}) => {
    const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

    return axios.post(url, body).then(ResponseBody);
  },
  delete: (endPoint: string, option: { baseURL?: any } = {}) => {
    const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

    return axios.delete(url).then(ResponseBody);
  },
};
