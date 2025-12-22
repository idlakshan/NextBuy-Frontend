import axios from "axios";
import summaryApi, { BaseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // console.log("Attaching access token to request");
      config.headers.Authorization = "Bearer " + token;
    } else {
      console.log("No access token found");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (original.url === "/api/user/refresh-token") {
      return Promise.reject(err);
    }

    if (err.response?.status === 403 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return Promise.reject(err);
      }

      isRefreshing = true;
      try {
        const r = await Axios({ ...summaryApi.refresh_token });
        const newToken = r.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        original.headers.Authorization = "Bearer " + newToken;

        isRefreshing = false;
        return Axios(original);
      } catch {
        isRefreshing = false;
        localStorage.clear();
        window.location = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default Axios;
