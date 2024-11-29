import { onlineManager } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
});

// Request interceptor

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!onlineManager.isOnline()) {
    throw {
      statusCode: "NA",
      message: "Network error, no internet connection detected!",
    };
  }

  return config;
});

// Response interceptor

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    if (axios.isCancel(error)) {
      console.log("cancelled");
      return null;
    }
    if (error?.response?.data?.message) {
      throw {
        statusCode: error?.response?.status ?? "NA",
        message: error?.response?.data?.message ?? error.message,
      };
    } else {
      throw {
        statusCode: error?.response?.status,
        message: "Something went wrong",
      };
    }
  }
);
