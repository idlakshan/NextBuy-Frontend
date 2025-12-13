import axios from "axios";
import summaryApi, { BaseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

const axiosNoIntercept = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token)
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    return config;
  },
  (err) => Promise.reject(err)
);

let isRefreshing = false;
let queue = [];

const processQueue = (err, token = null) => {
  queue.forEach(({ resolve, reject }) => {
    if (err) reject(err);
    else resolve(token);
  });
  queue = [];
};

Axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error?.config;
    const status = error?.response?.status;

    if (!originalReq) return Promise.reject(error);
    if (status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              originalReq.headers = {
                ...(originalReq.headers || {}),
                Authorization: `Bearer ${token}`,
              };
              resolve(Axios(originalReq));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshConfig = {
          ...(summaryApi.refreshToken || {}),
          withCredentials: true,
        };

        const refreshRes = await axiosNoIntercept(refreshConfig);

        const newAccessToken = refreshRes?.data?.data?.accessToken;
        if (!newAccessToken)
          throw new Error("No access token returned from refresh");
        localStorage.setItem("accessToken", newAccessToken);
        processQueue(null, newAccessToken);
        originalReq.headers = {
          ...(originalReq.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        };
        return Axios(originalReq);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
