export const BaseURL = "http://localhost:8080";

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
};

export default summaryApi;
