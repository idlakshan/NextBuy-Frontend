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
  frogot_password: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  frogot_password_verification: {
    url: "/api/user/verify-password",
    method: "PUT",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "PUT",
  },
};

export default summaryApi;
